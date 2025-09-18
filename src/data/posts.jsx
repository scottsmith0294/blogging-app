

const posts = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    author: 'Jane Doe',
    date: 'May 15, 2024',
    excerpt: 'Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. This post covers the basics of useState and useEffect.',
    content: '<p>React Hooks revolutionize how we write functional components by allowing them to manage state and side effects. The <code>useState</code> hook provides a way to add state variables to functional components. For example: <code>const [count, setCount] = useState(0);</code></p><p>The <code>useEffect</code> hook allows you to perform side effects in functional components, similar to lifecycle methods in class components. It takes a function as its first argument and an optional dependency array as its second. If the dependency array is empty, the effect runs once after the initial render. If it contains variables, the effect runs whenever those variables change.</p><p>Using hooks makes components more readable, reusable, and easier to test. They encourage a more functional programming paradigm in React development.</p>',
  },
  {
    id: '2',
    title: 'Tailwind CSS for Rapid UI Development',
    author: 'John Smith',
    date: 'April 28, 2024',
    excerpt: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. Learn how it speeds up your development workflow.',
    content: '<p>Tailwind CSS is different from traditional CSS frameworks like Bootstrap. Instead of providing pre-built components, it offers a vast set of utility classes that you can compose directly in your HTML. For example, to make text bold and blue, you\'d use <code>&lt;p class="font-bold text-blue-500"&gt;</code>.</p><p>This approach leads to highly customizable designs without writing custom CSS. While it might seem verbose at first, developers often find it faster and more consistent in the long run. It also helps in maintaining a consistent design system across large projects.</p><p>Setting up Tailwind involves configuring your <code>tailwind.config.js</code> file to specify where Tailwind should look for its classes and to customize your design tokens.</p>',
  },
  {
    id: '3',
    title: 'Understanding React Context API',
    author: 'Alice Johnson',
    date: 'March 10, 2024',
    excerpt: 'The Context API provides a way to pass data through the component tree without having to pass props down manually at every level.',
    content: '<p>React Context API is a powerful feature for managing state that needs to be accessible by many components at different nesting levels. It avoids "prop drilling," where you pass props through many intermediate components that don\'t directly use them.</p><p>To use Context, you typically create a Context object using <code>React.createContext()</code>. Then, you use a Provider component to make the context value available to all its descendants. Consumers (or the <code>useContext</code> hook) then read the value from the context.</p><p>While Context is excellent for certain types of global state (like theme, user authentication), for complex state management in large applications, libraries like Redux or Zustand might still be preferred.</p>',
  },
  {
    id: '4',
    title: 'Building Responsive Layouts with Flexbox and Grid',
    author: 'Bob Williams',
    date: 'February 20, 2024',
    excerpt: 'Mastering CSS Flexbox and Grid is essential for creating robust and flexible responsive web designs. This post dives into their core concepts.',
    content: '<p>Flexbox is a one-dimensional layout system that helps distribute space among items in a single row or column. It\'s perfect for aligning items, distributing space, and creating navigation bars. Key properties include <code>justify-content</code>, <code>align-items</code>, and <code>flex-direction</code>.</p><p>CSS Grid, on the other hand, is a two-dimensional layout system that allows you to define rows and columns simultaneously. It\'s ideal for creating complex page layouts, like dashboards or magazine layouts. Properties like <code>grid-template-columns</code>, <code>grid-template-rows</code>, and <code>grid-gap</code> are fundamental.</p><p>Combining Flexbox and Grid effectively allows you to build highly responsive and adaptable web interfaces that look great on any device size.</p>',
  },
];

export default posts;