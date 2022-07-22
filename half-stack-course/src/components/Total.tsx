interface CoursePartsObj {
    name: string;
    exerciseCount: number;
}
type CourseParts = Array<CoursePartsObj>;

const Total = ({parts}: {parts: CourseParts}) => {

  return (
    <div> <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p></div>
  )
}

export default Total