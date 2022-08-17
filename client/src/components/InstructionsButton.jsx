import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function VariableWidth({ text, display }) {
  const longText = `${text}`;

  return (
    <div>
      {display ? (
        <Tooltip
          arrow
          title={<span style={{ fontSize: '14px' }}>{longText}</span>}
        >
          <Button sx={{ p: 0, m: 0, fontSize: '12px' }}>
            <HelpOutlineIcon />
          </Button>
        </Tooltip>
      ) : (
        null
      )}
    </div>
  );
}
