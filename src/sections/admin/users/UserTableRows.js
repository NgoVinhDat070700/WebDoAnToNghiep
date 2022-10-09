import Iconify from '@/components/Iconify'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

UserTableRows.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleDeleteUser: PropTypes.func,
  handleEditUser: PropTypes.func
}
function UserTableRows({ row = {}, index, handleDeleteUser, handleEditUser }) {
  
  const { username = '', email = '', isAdmin = false } = row

  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{username}</TableCell>
      <TableCell>
        {email}
      </TableCell>
        <TableCell>
            {isAdmin ? "Admin" : "User"}
        </TableCell>
      <TableCell>
        <Tooltip title='Edit' onClick={handleEditUser} >
          <IconButton>
            <Iconify icon={'akar-icons:edit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Delete' onClick={handleDeleteUser} >
          <IconButton >
            <Iconify icon={'ant-design:delete-filled'} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default UserTableRows
