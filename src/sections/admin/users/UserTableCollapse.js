import Iconify from '@/components/Iconify'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

UserTableCollapse.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleDeleteUser: PropTypes.func,
  handleEditUser: PropTypes.func,
}
function UserTableCollapse({ row = {}, index, handleDeleteUser, handleEditUser }) {
  const { username = '', email = '', role = '' } = row || {}

  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{username}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{role}</TableCell>

      <TableRow>
        <TableCell>Hành động</TableCell>
        <TableCell>
          <Tooltip title='Sửa' onClick={handleDeleteUser}>
            <IconButton>
              <Iconify icon={'akar-icons:edit'} />
            </IconButton>
          </Tooltip>

          <Tooltip title='Xóa' onClick={handleEditUser}>
            <IconButton>
              <Iconify icon={'ant-design:delete-filled'} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableRow>
  )
}

export default UserTableCollapse
