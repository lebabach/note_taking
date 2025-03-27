import React from 'react'
import { Card } from '@mui/material'

export default function BodyBox( {content} ) {
  return (
    <Card sx={{ px: '60px', py:'30px', backgroundColor: '#F0EBCE',
                  marginLeft: 'auto', marginRight: 'auto', marginBottom: '25px' }}>
        {content}
    </Card>
  )
}
