import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export  const notyf = new Notyf({
    duration: 2000,
    ripple: true,
    position: {
      x: 'center',
      y: 'top',
    },
    types: [
        {
            type: 'warning',
            background: 'orange',
            dismissible: true
        },
        {
            type: 'info',
            background: '#17a2b8',
            dismissible: true
        },
        {
            type: 'error',
            background: '#dc3545',
            dismissible: true
        }
        ,
        {
            type: 'success',
            background: '#28a745',
            dismissible: true
        }
    ]
});