import delay from './delay';

const courses = [
  {
    id: "intro-to-sketch",
    title: "Introduction To Sketch ",
    watchHref: "http://www.veryaustin.com/courses/introduction-to-sketch",
    authorId: "ben-allen",
    length: "5:08",
    category: "Design"
  },
  {
    id: "node-fundamentals",
    title: "Node Fundamentals",
    watchHref: "http://www.veryaustin.com/courses/node-fundamentals",
    authorId: "ben-allen",
    length: "3:10",
    category: "Node"
  },
  {
    id: "architecture",
    title: "Architecting Applications To Scale",
    watchHref: "http://www.veryaustin.com/courses/architecting-applications",
    authorId: "ben-allen",
    length: "2:52",
    category: "Software Architecture"
  },
  {
    id: "learning-how-to-learn",
    title: "Learning How To Learn",
    watchHref: "http://www.veryaustin.com/courses/learning-how-to-learn",
    authorId: "mike-smith",
    length: "2:30",
    category: "Career"
  },
  {
    id: "html-svg",
    title: "Using SVG Graphics In Your HTML",
    watchHref: "http://www.veryaustin.com/courses/html-svg",
    authorId: "ben-allen",
    length: "5:10",
    category: "SVG"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], courses));
      }, delay);
    });
  }

  static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.veryaustin.com/courses/${course.id}`;
          courses.push(course);
        }

        resolve(course);
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          course.id == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;