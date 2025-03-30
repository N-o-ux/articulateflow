
import { faker } from '@faker-js/faker';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  category: string;
  author: Author;
  publishedDate: Date;
  readingTime: number;
  comments: Comment[];
  tags: string[];
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface Comment {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  date: Date;
  likes: number;
  replies: Reply[];
}

export interface Reply {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  date: Date;
  likes: number;
}

// Categories
export const categories = [
  'Technology',
  'Lifestyle',
  'AI',
  'Travel',
  'Business'
];

// Generate authors
const generateAuthors = (count: number): Author[] => {
  const authors: Author[] = [];
  for (let i = 0; i < count; i++) {
    authors.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      bio: faker.lorem.paragraph(2),
    });
  }
  return authors;
};

// Generate replies for comments
const generateReplies = (count: number): Reply[] => {
  const replies: Reply[] = [];
  for (let i = 0; i < count; i++) {
    replies.push({
      id: faker.string.uuid(),
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: `https://i.pravatar.cc/150?img=${faker.number.int({ min: 1, max: 70 })}`,
      },
      content: faker.lorem.paragraph(),
      date: faker.date.recent({ days: 10 }),
      likes: faker.number.int({ min: 0, max: 50 }),
    });
  }
  return replies;
};

// Generate comments for blog posts
const generateComments = (count: number): Comment[] => {
  const comments: Comment[] = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: faker.string.uuid(),
      author: {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        avatar: `https://i.pravatar.cc/150?img=${faker.number.int({ min: 1, max: 70 })}`,
      },
      content: faker.lorem.paragraph(),
      date: faker.date.recent({ days: 30 }),
      likes: faker.number.int({ min: 0, max: 100 }),
      replies: generateReplies(faker.number.int({ min: 0, max: 5 })),
    });
  }
  return comments;
};

// Generate blog content
const generateBlogContent = (): string => {
  const paragraphs = faker.number.int({ min: 5, max: 10 });
  let content = '';

  // Add featured image
  content += `<img src="${faker.image.url()}" alt="Featured image" class="w-full h-auto rounded-lg mb-6" />`;

  // Add introduction
  content += `<p>${faker.lorem.paragraphs(2)}</p>`;

  // Add subheading
  content += `<h2>${faker.lorem.sentence()}</h2>`;
  content += `<p>${faker.lorem.paragraphs(2)}</p>`;

  // Add blockquote
  content += `<blockquote>${faker.lorem.sentence()}</blockquote>`;
  content += `<p>${faker.lorem.paragraphs(1)}</p>`;

  // Add another subheading
  content += `<h3>${faker.lorem.sentence()}</h3>`;
  content += `<p>${faker.lorem.paragraphs(2)}</p>`;

  // Add list
  content += `<ul>`;
  for (let i = 0; i < 4; i++) {
    content += `<li>${faker.lorem.sentence()}</li>`;
  }
  content += `</ul>`;
  content += `<p>${faker.lorem.paragraphs(2)}</p>`;

  // Conclusion
  content += `<h3>Conclusion</h3>`;
  content += `<p>${faker.lorem.paragraphs(1)}</p>`;

  return content;
};

// Generate blog posts
const generateBlogPosts = (count: number): BlogPost[] => {
  const authors = generateAuthors(5);
  const posts: BlogPost[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[faker.number.int({ min: 0, max: categories.length - 1 })];
    const tags = [];
    const tagCount = faker.number.int({ min: 2, max: 5 });
    
    for (let j = 0; j < tagCount; j++) {
      tags.push(faker.word.sample());
    }

    posts.push({
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      excerpt: faker.lorem.paragraph(),
      content: generateBlogContent(),
      imageUrl: `https://picsum.photos/seed/${i + 1}/1200/800`,
      category,
      author: authors[faker.number.int({ min: 0, max: authors.length - 1 })],
      publishedDate: faker.date.recent({ days: 60 }),
      readingTime: faker.number.int({ min: 3, max: 15 }),
      comments: generateComments(faker.number.int({ min: 0, max: 8 })),
      tags,
    });
  }

  return posts;
};

// Generate 20 blog posts
export const blogPosts = generateBlogPosts(20);

// Get all blog posts
export const getAllPosts = (): BlogPost[] => {
  return blogPosts;
};

// Get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
};

// Get a single post by ID
export const getPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

// Search posts by keyword
export const searchPosts = (keyword: string): BlogPost[] => {
  const lowerKeyword = keyword.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowerKeyword) || 
    post.excerpt.toLowerCase().includes(lowerKeyword) || 
    post.content.toLowerCase().includes(lowerKeyword) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
};

// Get popular posts (most commented)
export const getPopularPosts = (limit: number = 5): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => b.comments.length - a.comments.length)
    .slice(0, limit);
};

// Get recent posts
export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => b.publishedDate.getTime() - a.publishedDate.getTime())
    .slice(0, limit);
};
