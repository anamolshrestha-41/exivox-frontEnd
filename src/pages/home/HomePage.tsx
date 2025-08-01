import FeedContainer from '../../components/features/feed/FeedContainer'
import CreatePost from '../../components/features/feed/CreatePost'
import Stories from '../../components/features/feed/Stories'

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Stories />
      <CreatePost />
      <FeedContainer />
    </div>
  )
}