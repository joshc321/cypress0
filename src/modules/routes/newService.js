import { IconButton, Box, Typography,
    Stack, TextField, Grid, FormControlLabel,
    Checkbox
} from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import MainButton from '../components/mainbutton';
import BottomNavigationBar from '../components/bottomNavigationBar';
import { useState } from 'react'
import AppForm from '../components/AppForm';
import { useNavigate } from 'react-router-dom';
 


function NewService() {

    const navigate = useNavigate();

    const [checked, setChecked] = useState(true);

    const date = new Date();
    let parsedYear = date.getFullYear();
    let parsedField = (field) => {
        let fieldS = ''
        if (field < 10){
            fieldS = `0${field}`;
        }
        else{
            fieldS = field;
        }
        return(fieldS);
    }
    let parsedMonth = parsedField(date.getMonth()+1);
    let parseDay = parsedField(date.getDate());
    let parseHour = parsedField(date.getHours());
    let parseMin = parsedField(date.getMinutes());
    let stringDate = `${parsedYear}-${parsedMonth}-${parseDay}T${parseHour}:${parseMin}`
    console.log(stringDate);

    const [values, setValues] = useState({
        datetime: stringDate, 
        address: '',
        city: '',
        state: '',
        zip: '',
        service: '',
        notes: '',
        bill: '',
      });
    
      const handleCheck = (e) => {
          setChecked(!checked)
      }

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };


      const handleSubmit = (e) => {
        e.preventDefault()

        console.log(values)
      }

    return(
        <Box sx={{ pb: 10 }}>
            <Box sx={{ml: 0, mt:0}}>
                <IconButton
                    aria-label="back button"
                    onClick={()=>navigate(-1)}
                    edge="end"
                    >
                    {<ArrowBackIosNew/>}
                </IconButton>
            </Box>
            <Box sx={{ml: 2, mt: 2}}>
                <Typography fontWeight="fontWeightBold" variant="h4">New Service Record</Typography>
            </Box>
            
            <AppForm top={1}>

                <form noValidate onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Box sx={{ pt: 0 }}>
                            <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ml: 2, mt: 1, pr: 4}}>
                                <Grid >
                                <Typography fontWeight="fontWeightSemibold" variant="h6">Info</Typography>
                                </Grid>
                                <Grid >
                                <FormControlLabel labelPlacement="start" control={
                                    <Checkbox 
                                        checked={checked}
                                        onChange={handleCheck}
                                        color="primary"
                                    />
                                } label={<Typography fontWeight="fontWeightThin" variant="body2">Default</Typography>} />                            </Grid>
                            </Grid> 
                        </Box>
                            <TextField 
                                id="datetime"
                                type="datetime-local"
                                label="Date Time"
                                value={values.datetime}
                                fullWidth
                                onChange={handleChange('datetime')}
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                              />
                        
                        {!checked ? 
                        <Stack spacing={2}>
                        <TextField 
                            autoComplete="street-address"
                            label="Address"
                            fullWidth
                            value={values.address}
                            onChange={handleChange('address')}
                        />
                        <TextField 
                            label="City"
                            autoComplete="address-level2"
                            fullWidth
                            value={values.city}
                            onChange={handleChange('city')}
                        />
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <TextField 
                                label="State"
                                autoComplete="address-level1"
                                sx={{width: "49%"}}
                                value={values.state}
                                onChange={handleChange('state')}
                            />
                            <TextField 
                                label="Zip"
                                autoComplete="postal-code"
                                sx={{width: "49%"}}
                                value={values.zip}
                                onChange={handleChange('zip')}
                            />
                        </Grid> 
                        </Stack>
                        : ''}
                        <TextField 
                            label="Service"
                            fullWidth
                            value={values.service}
                            onChange={handleChange('service')}
                        />
                        <TextField 
                            label="Notes"
                            fullWidth
                            value={values.notes}
                            onChange={handleChange('notes')}
                        />
                        <TextField 
                            label="Bill"
                            type="number"
                            fullWidth
                            value={values.bill}
                            onChange={handleChange('bill')}
                        />
                        <MainButton text={"Create"} />
                    </Stack>
                </form>
            </AppForm>
            <BottomNavigationBar />
        </Box>
    )
}

export default NewService