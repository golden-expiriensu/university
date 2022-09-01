export const port = 3000;
export const baseUrl = `http://localhost:${port}`;
export const apiPath = {
  auth: {
    root: '/auth',
    signup() {
      return this.root + '/signup';
    },
    signin() {
      return this.root + '/signin';
    },
  },
  performance: {
    root: '/performance/grade',
    createGrade() {
      return this.root;
    },
    editGrade(id: number) {
      return `${this.root}/${id}`;
    },
    deleteGrade(id: number) {
      return `${this.root}/${id}`;
    },
    getMyGradesByLesson() {
      return this.root + '/my/all-by-lesson';
    },
    getMyAverageGradeByLesson() {
      return this.root + '/my/average-by-lesson';
    },
    getAverageGradeByStudent() {
      return this.root + '/average-by-student';
    },
    getAverageGradeByGroup() {
      return this.root + '/average-by-group';
    },
    getAverageGradeByFaculty() {
      return this.root + '/average-by-faculty';
    },
  },
  profile: {
    root: 'profile',
    create() {
      return this.root;
    },
    get() {
      return this.root;
    },
    edit() {
      return this.root;
    },
    delete() {
      return this.root;
    },
  },
  user: {
    root: '/user',
    create() {
      return this.root;
    },
    edit() {
      return this.root;
    },
    get() {
      return this.root;
    },
  },
};
