const users = [
  {
    id: 1,
    username: 'tatyg',
    email: 'tatygraesser@gmail.com',
    password: 'password',
    name: 'Tatyana',
    groups: [
      1,
      4
    ]
  },
  {
    id: 2,
    name: 'Alwyn',
    username: 'azhang',
    email: 'alwyn_zhang@hotmail.com',
    password: 'password',
    groups: [
      1,
      2,
      3
    ]
  },
  {
    id: 3,
    name: 'Kevin',
    username: 'kag222',
    email: 'kag222@nyu.edu',
    password: 'password',
    groups: [
      1,
      3,
      4
    ]
  },
  {
    id: 4,
    name: 'Helen',
    username: 'hxu',
    email: 'hjx201@nyu.edu',
    password: 'password',
    groups: [
      1,
      2
    ]
  },
  {
    id: 5,
    name: 'Test',
    username: 'testing',
    email: 'testing@test.com',
    password: 'password',
    groups: [6]
  },
  {
    id: 6,
    name: 'No Group Test',
    username: 'testing',
    email: 'testing@test.com',
    password: 'password',
    groups: []
  }
];

const groups = [
  {
    id: 1,
    name: 'Group 1',
    admins: [1],
    members: [
      2,
      3,
      4
    ],
    tasks: [
      {
        id: 1,
        name: 'Task 1',
        description: 'This is the description for Task 1',
        assigned: { id: 1, name: 'Tatyana' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: false,
        comments: []
      },
      {
        id: 2,
        name: 'Task 2',
        description: 'This is the description for Task 2',
        assigned: { id: 3, name: 'Kevin' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: false,
        comments: [{ commentor: 1, comment: 'This is a comment' }, { commentor: 3, comment: 'This is another comment' } ]
      },
      {
        id: 3,
        name: 'Task 3',
        description: 'This is the description for Task 3',
        assigned: { id: 2, name: 'Alwyn' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: true,
        comments: [{ commentor: 2, comment: 'This is a comment' }, { commentor: 3, comment: 'This is another comment' } ]
      },
      {
        id: 4,
        name: 'Task 4',
        description: 'This is the description for Task 4',
        assigned: { id: 3, name: 'Kevin' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: true,
        comments: [{ commentor: 1, comment: 'This is a comment' }]
      }
    ]
  },
  {
    id: 2,
    name: 'Group 2',
    admins: [2],
    members: [4],
    tasks: [
      {
        id: 3,
        name: 'Task 3',
        description: 'This is the description for Task 3',
        assigned: { id: 4, name: 'Helen' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: false,
        comments: [{ commentor: 1, comment: 'This is a comment' }]
      },
      {
        id: 4,
        name: 'Task 4',
        description: 'This is the description for Task 4',
        assigned: null,
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: false,
        comments: []
      }
    ]
  },
  {
    id: 3,
    name: 'Group 3',
    admins: [
      2,
      3
    ],
    members: [],
    tasks: [
      {
        id: 5,
        name: 'Task 5',
        description: 'This is the description for Task 5',
        assigned: { id: 2, name: 'Alwyn' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: false,
        comments: []
      },
      {
        id: 6,
        name: 'Task 6',
        description: 'This is the description for Task 6',
        assigned: { id: 3, name: 'Kevin' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: false,
        comments: [{ commentor: 3, comment: 'This is a comment' }]
      }
    ]
  },
  {
    id: 4,
    name: 'Group 4',
    admins: [3],
    members: [1],
    tasks: [
      {
        id: 7,
        name: 'Task 7',
        description: 'This is the description for Task 7',
        assigned: { id: 1, name: 'Tatyana' },
        assignedDate: '04/05/2021',
        dueDate: '04/07/2021',
        completed: false
      }
    ]
  },
  {
    id: 5,
    name: 'Group 5',
    admins: [6],
    members: [],
    tasks: []
  }
];

module.exports.users = users;
module.exports.groups = groups;
