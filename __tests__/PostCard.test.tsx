import { render, screen } from '@testing-library/react';
import PostCard from '@/components/PostCard';

describe('PostCard', () => {
  it('renders title and tags', () => {
    render(
      <PostCard
        post={{ slug: 'test', title: 'Test Title', date: '2025-01-01', tags: ['Food'], content: '', excerpt: 'x', image: '' }}
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
  });
});


