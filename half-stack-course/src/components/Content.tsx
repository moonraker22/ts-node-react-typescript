import Part from './Part'
import { CoursePart } from '../App'

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      <Part parts={parts} />
    </div>
  )
}

export default Content
