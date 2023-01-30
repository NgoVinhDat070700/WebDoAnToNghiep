import Iconify from '@/components/Iconify'
import Label from '@/components/Label'
import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material'
import PropTypes from 'prop-types'

UserTableRows.propTypes = {
  row: PropTypes.object,
  index: PropTypes.number,
  handleDeleteUser: PropTypes.func,
  handleEditUser: PropTypes.func
}
function UserTableRows({ row = {}, index, handleDeleteUser, handleEditUser }) {
  
  const { username = '', email = '', role = '' } = row

  return (
    <TableRow hover tabIndex={index} key={index}>
      <TableCell>{username}</TableCell>
      <TableCell>
        {email}
      </TableCell>
        <TableCell>
            <Label color={role==='admin'?'primary':'secondary'}>{role}</Label>
        </TableCell>
      <TableCell>
        <Tooltip title='Sửa' onClick={handleEditUser} >
          <IconButton>
            <Iconify icon={'akar-icons:edit'} />
          </IconButton>
        </Tooltip>

        <Tooltip title='Xóa' onClick={handleDeleteUser} >
          <IconButton >
            <Iconify icon={'ant-design:delete-filled'} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  )
}

export default UserTableRows
