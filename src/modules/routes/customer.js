import { Box,Typography, List, ListItemText,
    ListItemButton, ListItem, Divider,
     ListItemIcon, Fab, Backdrop, IconButton
 } from '@mui/material'
import { ArrowForwardIos,
        PinDrop, Event, LocalAtm, Notes, Note,
        Phone, Email, Add
 } from '@mui/icons-material'
import BottomNavigationBar from '../components/bottomNavigationBar'
import { Link, useParams, useNavigate } from 'react-router-dom'
import TopBar from '../components/topBar'
import { useState } from 'react'
import  QrCode  from 'react-qr-code'
import * as svg from 'save-svg-as-png'

function mapsSelector(search) {
    let searchEncode = encodeURIComponent(search)
    if /* if we're on iOS, open in Apple Maps */
      ((navigator.userAgent.indexOf("iPhone") !== -1) || 
       (navigator.userAgent.indexOf("iPod") !== -1) || 
       (navigator.userAgent.indexOf("iPad") !== -1))
      window.open(`maps://maps.google.com/maps/search/?daddr=${searchEncode}`);
  
    else /* else use Google */
      window.open(`https://maps.google.com/maps/search/?api=1&query=${searchEncode}`);
  }


function Customer(){
    const navigate = useNavigate();
    let { slug } = useParams(); 
    slug = slug.substring(1);
    const result = customerExamples.find( ({ id }) => id === slug );
    const [showQR, setShowQR] = useState(false)

    const downloadQR = () => {
        svg.saveSvgAsPng(document.getElementById("12345"), "qrcode.png");
      };

    const serviceResult = [serviceExamples.find( ({ custid }) => custid === slug ),
        {
            id: '9367812',
            name: 'Joe Dirt',
            description: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
            date: 'December 17, 1995',
            address: '1123 South State Street, Hemet, California 92543, United States',
            cost: '23.32',
            notes: 'did some things you kmow',
            custid: '2341234'
          },
    ];
    
    
    
    const onClick = () => {
        setShowQR(!showQR)
    }

    return(
        <div>
            <TopBar onClick={onClick} primary={result.name} id={result.id} secondary="Information"/>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={showQR}
                onClick={onClick}
            >
                <Box alignItems="center" justifyContent="center">
                    <IconButton onClick={downloadQR}>
                    <QrCode 
                        id="12345"
                        value={`cypr:${result.id}`}
                    />
                    </IconButton>
                </Box>
            </Backdrop>
            <Box sx={{pt: 0, pb: 8}}>
                <List>
                    <ListItem sx={{ p: 0}} onClick={() => mapsSelector(result.address)}> 
                        <ListItemButton>
                            <ListItemIcon>
                                <PinDrop />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: 300,  pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.address}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Phone />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.phone}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Email />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>${result.email}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Event />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.date}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ mt: 1,borderBottomWidth: 3 }}/>
                    <ListItem> 
                        <ListItemIcon>
                            <Note />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.description}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem> 
                        <ListItemIcon>
                            <Notes />
                            <ListItemText 
                                primary={
                                    <div>
                                        <Typography sx={{ maxWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{result.notes}</Typography>
                                    </div>
                                }/>
                        </ListItemIcon>
                    </ListItem>
                    <Divider sx={{ borderBottomWidth: 18 }}/>
                    <Box sx={{ml: 2, mt: 1}}>
                        <Typography fontWeight="fontWeightBold" variant="h4">Service Record</Typography>
                    </Box>
                    <Divider sx={{pt: 1, borderBottomWidth: 3 }}/>
                </List>
                <Box sx={{pt: 0}}>
                    <List>
                        {serviceResult.map(({ name, description, notes, cost, date, id }, index) => (
                        <div key={index}>
                        <ListItem key={id} sx={{p: 0}}>
                            <ListItemButton component={Link} to={`/logs/:${id}`}>
                                <Event color="secondary"/>
                                <ListItemText 
                                    primary={
                                        <div>
                                        <Typography sx={{pl: 1, fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{date}</Typography>
                                        </div>
                                    }/>
                                <ArrowForwardIos />
                            </ListItemButton>    
                            
                        </ListItem>
                        <ListItem> 
                            <ListItemIcon>
                                <Note />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: 300, minWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{description}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem> 
                            <ListItemIcon>
                                <Notes />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: 300, minWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{notes}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItem>
                        <ListItem> 
                            <ListItemIcon>
                                <LocalAtm />
                                <ListItemText 
                                    primary={
                                        <div>
                                            <Typography sx={{ maxWidth: 300, minWidth: 300, pl:1 ,fontFamily: 'Proxima Nova Alt', fontWeight: "fontWeightThin", fontSize: 13 }}>{cost}</Typography>
                                        </div>
                                    }/>
                            </ListItemIcon>
                        </ListItem>
                        <Divider sx={{pt: 1, borderBottomWidth: 2 }}/>
                        </div>
                        ))}
                    </List>
                </Box>
            </Box>
            <Fab onClick={()=>navigate(`/new-service/:${result.id}`)} color="primary" sx=
                {{
                    position: 'fixed',
                    bottom: 86, 
                    right: 16,
                }}>
                <Add />
            </Fab>
        
            <BottomNavigationBar />
        </div>
    )
}

export default Customer;

const serviceExamples = [
    {
      id: '9367812',
      name: 'Joe Dirt',
      description: "I'll be in the neighbourhood this week. Let's grab a bite to eat",
      date: 'December 17, 1995',
      address: '1123 South State Street, Hemet, California 92543, United States',
      cost: '23.32',
      notes: 'did some things you kmow',
      custid: '2341234'
    },
    {
      id: '9367193',
      name: 'Abrial Dias',
      description: `Do you have a suggestion for a good present for John on his work
        anniversary. I am really confused & would love your thoughts on it.`,
      date: 'June 3, 2003',
      address: '1123 South State Street, Hemet, California 92543, United States',
      cost: '2.32',
      notes: 'did some tings you kmow',
      custid: '2342342'
    },
    {
        id: '8103651',
        name: 'Azikil Dirt',
        description: "doingDi some oteha sdufa",
        date: 'December 17, 3002',
        address: '2983 Yo mama way Bazin, California 92543, United States',
      cost: '23.32',
      notes: 'did some things you kmow',
      custid: '927381',
    },
  ];

  const customerExamples = [
    {
      id: '2341234',
      name: 'Joe Dirt',
      phone: '902 873 4721',
      address: 'Hemet CA',
      email: 'ajsdf@gail.com',
      description: 'this man kinda like idk adjfa adaldj adsfj asda djfakd a dkad klads',
      notes: 'joe mama lives here gottem',
      date: 'November 18, 2021',
    },
    {
      id: '2342342',
      name: 'Abrial Dias',
      phone: '823 876 1234',
      address: 'Western, CA',
      email: 'ajsdf@gail.com',
      description: 'this man kinda like idk adjfa adaldj adsfj asda djfakd a dkad klads',
      notes: 'joe mama doesnt live here gottem',
      date: 'January 3, 3012',
    },
    {
        id: '927381',
        name: 'Azikil Dirt',
        phone: "093 234 1293",
        address: 'joe mamas house',
        email: 'ajsdf@gail.com',
        description: 'this man kinda like idk adjfa adaldj adsfj asda djfakd a dkad klads',
        notes: 'joe mama lives here gottem',
        date: 'December 17, 2010',
    },
  ];