import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import Image from 'next/image';

interface CartItem {
  id: number;
  bookId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  book: {
    id: number;
    title: string;
    price: number;
    coverImage: string;
    isActive: boolean;
    stock: number;
    isbn: string;
    author?: string;
    category?: string;
  };
}

interface CartResponse {
  success: boolean;
  message: string;
  data: {
    cartId: number;
    items: CartItem[];
    grandTotal: number;
  };
}

export default function MyCartPage() {
  const queryClient = useQueryClient();
  const token = useSelector((state: any) => state.auth.token);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data, isLoading } = useQuery<CartResponse>({
    queryKey: ['my-cart'],
    queryFn: async () => {
      const response = await fetch(
        'https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.json();
    },
  });

  const borrowMutation = useMutation({
    mutationFn: async () => {
      return fetch('https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartId: data?.data.cartId,
          items: selectedItems,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-cart'] });
      setSelectedItems([]);
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const items = data?.data.items ?? [];
  const allSelected = selectedItems.length === items.length;

  const toggleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? items.map((i) => i.id) : []);
  };

  const toggleItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 p-4'>
      {/* Left section */}
      <div className='md:col-span-2 space-y-4'>
        <h1 className='text-2xl font-semibold mb-4'>My Cart</h1>

        <div className='flex items-center gap-2 mb-4'>
          <Checkbox
            checked={allSelected}
            onCheckedChange={(c) => toggleSelectAll(Boolean(c))}
          />
          <p className='text-sm'>Select All</p>
        </div>

        <div className='space-y-4'>
          {items.map((item) => (
            <Card key={item.id} className='p-4 flex gap-4 items-center'>
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
              />

              <Image
                src={item.book.coverImage}
                alt={item.book.title}
                width={60}
                height={80}
                className='rounded'
              />

              <div className='flex flex-col'>
                <span className='text-xs bg-gray-100 px-2 py-1 rounded w-fit'>
                  {item.book.category ?? 'Book'}
                </span>
                <p className='font-medium'>{item.book.title}</p>
                <p className='text-sm text-gray-500'>
                  {item.book.author ?? 'Unknown Author'}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Right section - Loan Summary */}
      <Card className='p-4 h-fit'>
        <CardContent>
          <h2 className='text-lg font-semibold mb-4'>Loan Summary</h2>

          <div className='flex justify-between mb-6'>
            <span>Total Books</span>
            <span className='font-semibold'>{selectedItems.length}</span>
          </div>

          <Button
            className='w-full'
            disabled={selectedItems.length === 0 || borrowMutation.isPending}
            onClick={() => borrowMutation.mutate()}
          >
            {borrowMutation.isPending ? 'Processing...' : 'Borrow Book'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
