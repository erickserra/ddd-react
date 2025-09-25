import Box from '@mui/material/Box';

type Props = {
  tabIndex: number;
  currentTabIndex: number;
} & React.PropsWithChildren;

export function TabItem({ children, tabIndex, currentTabIndex, ...other }: Props) {
  return (
    <Box
      component="div"
      sx={{ height: '100%', width: '100%' }}
      role="tabpanel"
      hidden={currentTabIndex !== tabIndex}
      {...other}
    >
      {currentTabIndex === tabIndex && children}
    </Box>
  );
}
