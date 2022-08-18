import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HelpContext from './HelpContext';

export default function VariableWidth({ text }) {
  const longText = `${text}`;
  const [display, setDisplay] = useContext(HelpContext);

  const newText = text.split('?').map((str) => <p>{str}</p>);

  return (
    <div>
      {display ? (
        <Tooltip
          arrow
          title={<span style={{ fontSize: '14px' }}>{newText}</span>}
        >
          <Button sx={{
            p: 0, m: 0, fontSize: '12px', minWidth: '0px',
          }}
          >
            <HelpOutlineIcon />
          </Button>
        </Tooltip>
      ) : null}
    </div>
  );
}
