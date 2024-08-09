import { IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface localProps {
  title: String;
  onClick: () => void;
  icon: React.ReactElement
}

export default function NavBarTextButton({ title, onClick, icon }: localProps) {
  return (
    <ListItem
      sx={{ textTransform: "none", fontWeight: "300" }}
      color="info"
      onClick={onClick}
    >
        
      <ListItemButton>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
        <ListItemText primary={title}/>
      </ListItemButton>
    </ListItem>
  );
}
