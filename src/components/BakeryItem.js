import { Button, Card, CardMedia, Typography, Box} from "@mui/material"
import { useState } from "react";

export default function BakeryItem(props) {

    const [buttonText, setButtonText] = useState("add to favorites");

    const addToCart = () => {
        let newCart
        if (buttonText ==="add to favorites") {
            newCart = {...props.cart, [props.item.name]: props.item.name in props.cart ? {...props.item}: {...props.item}}
            setButtonText("remove from favorites")
        }
        else {
            newCart = {...props.cart}

            const removeItem = {...props.item}
            const key = removeItem.name

            delete newCart[key]



            setButtonText("add to favorites")
        }

        props.handler(newCart)
    }

    const item = props.item;

    return (
        <Card sx={{ width: 1, height: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%'}}>
            <CardMedia 
                component='img'
                image={item.image}
            />
            <Box
            sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    gap: '1rem',
                    padding: '1rem 1rem'
                }}
                >
                    <Box>
                        <Typography sx={{ 
                            fontSize: 'h6.fontSize', 
                            fontWeight: 'bold'
                            }}
                        >
                            {item.name}
                        </Typography>
                        <Typography>
                            {item.description}
                        </Typography>
                    </Box>
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center'
                        }}
                    >
                        <Typography>
                            {'$' + item.price}
                        </Typography>

                        
                            <Button 
                                variant="contained" 
                                disableElevation
                                onClick={addToCart}
                                sx={{ml: 2}}
                                style={{ fontSize: '12px' }}
                            >
                                {buttonText}
                            </Button>
                        

                    </Box>   
                </Box>  
            </Box>
        </Card>
    );
}

