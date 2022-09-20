import { Grid } from "@mui/material";
import { AlbumCard } from "./AlbumCard";

interface Props {
    currentAlbums: SpotifyApi.SavedAlbumObject[]
}

export const AlbumGrid = ({currentAlbums}: Props) => 
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        { currentAlbums.map(({album}, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <AlbumCard album={album}/>
          </Grid>
        ))}
      </Grid>


