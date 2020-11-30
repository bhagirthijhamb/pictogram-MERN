import Grid from '@material-ui/core/Grid';
import Navbar from './../Navbar';


const Home = () => {
    return (
        <div className="classes root">
            <Navbar />
            <Grid container spacing={4}>
                <Grid item sm={3} xs={12}>
                </Grid>
                <Grid item sm={4} xs={12}>
                    <h2>Home</h2>
                </Grid>
                <Grid item sm={3} xs={12}>
                    <h2>Follow..</h2>
                </Grid>
            </Grid>
        </div>
        
    )
}

export default Home;