export const USERS = '/users'
export const USER_EDIT = '/user/:id'

export const userTableColumns = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
]

export const userFilterOptions = [
    {id: 1, value: '', label: 'All'},
    {id: 2, value: 'male', label: 'Male'},
    {id: 3, value: 'female', label: 'Female'},
];
