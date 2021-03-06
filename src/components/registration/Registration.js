import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {registration} from "../../actions/user";
import {useInput} from "../../hooks/inputHooks";

const Registration = () => {

    const email = useInput('', {isEmpty: true, minLength: 3});
    const password = useInput('', {isEmpty: true, minLength: 6});

    return (
        <Container maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Typography
                    component="h1"
                    variant="h6"
                >
                    Registration
                </Typography>
                <Box component="form" sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {
                            (email.isDirty && email.minLengthError)
                            ?
                            <TextField
                                required
                                error
                                fullWidth
                                id="outlined-error-helper-text"
                                label="Email Address"
                                //defaultValue="Hello World"
                                helperText="Incorrect email."
                                value={email.value}
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                            />
                            :
                            (email.isDirty && email.isEmpty)
                            ?
                            <TextField
                                required
                                error
                                fullWidth
                                id="outlined-error-helper-text"
                                label="Email Address"
                                //defaultValue="Hello World"
                                helperText="Empty email."
                                value={email.value}
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                            />
                            :
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                value={email.value}
                                onChange={e => email.onChange(e)}
                                onBlur={e => email.onBlur(e)}
                            />
                            }
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                sx={{marginTop: 1}}
                                value={password.value}
                                onChange={e => password.onChange(e)}
                                onBlur={e => password.onBlur(e)}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                        onClick={() => registration(email.value, password.value)}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Registration;