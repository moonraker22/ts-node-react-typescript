interface CoursePartsObj {
    name: string;
    exerciseCount: number;
}
type CourseParts = Array<CoursePartsObj>;

const Content = ({parts}:{parts:CourseParts}) => {
  return (
    <div>
        {parts.map(coursePart => (
            <p key={coursePart.name}>
                {coursePart.name} {coursePart.exerciseCount}
            </p>
        ))}
    </div>
  )
}

export default Content