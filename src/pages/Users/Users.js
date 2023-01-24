import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {isEmpty} from 'lodash';
import {DataGrid} from '@mui/x-data-grid';
import $api from '../../helpers/api_helper';
import {InputLabel, Select} from '@mui/material';
import {userFilterOptions, userTableColumns} from '../../common/constant';

const Users = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [filters, setFilters] = useState({})

    useEffect(() => {
        setLoading(true)

        fetchUsers().then(({
           data: users = [],
           meta: { pagination: { total = 0 }}
        }) => {
            setUsers(users)
            setTotalPages(total)
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }, [currentPage, pageSize, filters]);

    const fetchUsers = async ()=> {
        const {data} = await $api.get(`https://gorest.co.in/public/v1/users?page=${currentPage}&per_page=${pageSize}&${filtersQueryParams(filters)}`)
        return data;
    }

    const filtersQueryParams = (filters) => {
        return Object.entries(filters).map(([key, val]) => `${key}=${val}`).join('&');
    }

    const goToProfile = (userId) => {
        if (userId) {
            navigate(`/user/${userId}`)
        }
        else {
            toast.error('Something went wrong.')
        }
    }

    const handleChangeSelect = ({target: {value, name}}) => {
        setFilters((prev)=> {
            const {[name]: newVal, ...restFiltersWithoutEmptyParam} = prev
            if (isEmpty(value)) {
                return {
                    ...restFiltersWithoutEmptyParam
                }
            }

            return {
                ...prev,
                [name]: value
            }
        })
    }
    return (
        <Box>
            <InputLabel>Gender filter</InputLabel>
            <Select
                native
                defaultValue=""
                onChange={handleChangeSelect}
                name="gender"
            >
                {userFilterOptions.map((option) => (
                    <option value={option.value} key={option.id}>{option.label}</option>
                ))}
            </Select>
            <DataGrid
                autoHeight
                rows={users}
                rowCount={totalPages}
                loading={loading}
                rowsPerPageOptions={[10, 30, 50, 100]}
                pagination={true}
                page={currentPage - 1}
                pageSize={pageSize}
                paginationMode="server"
                onPageChange={(newPage) => setCurrentPage(prev => (newPage + 1 ))}
                onPageSizeChange={(newPageSize) => setPageSize(prev => (newPageSize + 1 ))}
                columns={userTableColumns}
                onRowClick={(row)=>{ goToProfile(row.id)} }
                checkboxSelection={false}
            />
        </Box>
    );
};

export default Users;
