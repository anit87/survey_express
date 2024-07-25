import React, { useState } from 'react';
import "./allUsers.css";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function TreeTable(props) {
    const { data } = props;
    const [open, setOpen] = useState(false);

    return (
        <table className="tree-table">
            <thead>
                <tr>
                    <th></th>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <React.Fragment key={row._id}>
                        <tr className="category-row">
                            <td>
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => setOpen(!open)}
                                >
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </td>
                            <td>{parseInt(index) + 1}</td>
                            <td>{row.displayName || `---`}</td>
                            <td>{row.email}</td>
                            <td>{row.phoneNumber || `---`}</td>
                            <td>{row.userRole === '2' ? 'Supervisor' : '3' ? 'Field Agent' : ""}</td>

                        </tr>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            {row.fieldUsers.map((subcategory, i) => (
                                <tr key={subcategory._id} className="subcategory-row">
                                    <td>{parseInt(i) + 1}</td>
                                    <td>{subcategory.displayName}</td>
                                    <td>{subcategory.email}</td>
                                    <td>{subcategory.phoneNumber || `---`}</td>
                                    <td>{subcategory.userRole === '2' ? 'Supervisor' : '3' ? 'Field Agent' : ""}</td>
                                </tr>
                            ))}
                        </Collapse>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}
export default TreeTable;