# Next JS

## Data Fetching Options / Considerations

### Option #1 - Parent Component gets data and passes it to child

Pros:

- Easy to see what data a route needs to be displayed
- Easier to make the child component reusable
- Easier to avoid 'n+1' query issues
  - n+1 query issues is setting up data fetching the realizing you need more data so you query for that data inside the component and end making a request for each time the component is rendered.

Cons:

- Can lead to overfetching data
  - could be a small performance hit depending on the unnecessary data being fetched
- Can lead to duplicate code in other Pages using the child component
- Sometimes annoying to write the interface for complex query data
- Could end up in a slightly lower page load speed

### Option #2 - Child Component fetches data directly

Pros:

- Easier to build 'skeleton' loading pages
- Slightly faster page load

Cons:

- Child components implementation is locked in
- Components end up not being as reusable

### Option #1.5 -  Child Fetches Data, but Parent decides what data

**Step 1:**

Separate file that lists all the queries that can provide data to a Component

```typescript
type PostWithData = (Post & {
    topic: { slug: string },
    _count: { comments: number },
    user: { name: string }
})

export function fetchPostsBySlug(slug: string): Promise<PostWithData[]> {

}

export function fetchTopPosts(): Promise<PostWithData[]> {

}
```

**Step 2:**

Component expects to receive a function through props that will return with type previously created in the separate file

```typescript
interface PostListProps {
    fetchPosts: () => Promise<PostWithData[]>
}

export default function async PostList({ fetchData }) {
	const posts = await fetchData();
	
	return posts.map(() => ...)
}
```

**Step 3:**

Parent can decide what data to fetch and the child component can fetch it.

Parent 1:
```react
import { fetchPostsBySlug } from 'queries/posts';
import PostList from './post-list';

export default function TopicShowPage({ params: { slug }}) {
	return <PostList
		fetchData={() => fetchPostsBySlug(slug)}
	/>
}
```

Parent 2:

```react
import { fetchTopPosts } from 'queries/posts';
import PostList from './post-list';

export default function HomePage() {
	return <PostList
		fetchData={fetchTopPosts}
	/>
}
```

