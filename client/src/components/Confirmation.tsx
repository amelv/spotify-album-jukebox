import { useCallback, useState } from "react";
import { Button, Container, Typography} from "@mui/material";
import { useStore, useHydration } from "../store";
import { SelectedAlbumsList } from "./SelectedAlbumsList";
import { useNavigate } from "react-router-dom";
import { ConfirmationDialog } from "./ConfirmationDialog";

export const Confirmation = () => {
  const isHydrated = useHydration()
  const accessToken = useStore((store) => store.tokens.access);
  const selectedAlbums = useStore((store) => store.selectedAlbums);
  const syncState = useStore((store) => store.syncState)
  const setSyncState = useStore((store) => store.setSyncState)
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false)

  const handleDelete = useCallback(async () => {
    setSyncState({...syncState, type: 'delete'})
    setShowDialog(true)
  }, [accessToken, selectedAlbums, syncState,setSyncState, isHydrated]);

  const handleSave = useCallback(async () => {
    setSyncState({...syncState, type: 'save'})
    setShowDialog(true)
  }, [accessToken, selectedAlbums, syncState, setSyncState, isHydrated]);

  return isHydrated ? (
    <Container sx={{maxWidth: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems:'center', gap: '30px', padding: '20px'}}>
      <Typography variant="h1">Add Saved Albums to "Liked Songs"</Typography>
      <Typography variant="body1">
        This will add all songs from your selected saved albums into your "Liked
        Songs" playlist.
      </Typography>
      {syncState.allAlbums ? (
        <Typography variant="h4">
          You are syncing ALL your saved albums.
        </Typography>) :  
        (<SelectedAlbumsList />)}
      <Container sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '30px'}}>
        <Button variant="contained" color="secondary" onClick={() => navigate(-1)} >Go Back</Button>
        <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
        <Button variant="contained" color="success" onClick={handleSave}>Save</Button>
      </Container>
      <ConfirmationDialog open={showDialog} type={syncState.type ?? 'save'} onCancel={() => setShowDialog(false)} onContinue={() => {
        navigate('/sync-results')
      }} />
    </Container>
  ) : null;
};
