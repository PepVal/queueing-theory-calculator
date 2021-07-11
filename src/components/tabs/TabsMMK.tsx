import React from 'react';
import { AppBar, Box, Tab, Tabs, Typography } from '@material-ui/core';

import { MMKModel } from '../../library/queueing/formulas/MMK.model';
import ResultItem from '../results/ResultItem';
import CostTab from '../cost/CostTab';

interface TabsMMKProps {
  result: MMKModel;
  labelPn: string;
}

const TabsMMK = ({ result, labelPn }: TabsMMKProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" elevation={0}>
        <Tabs
          className="bg-white text-black shadow"
          indicatorColor="primary"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Respuesta" {...a11yProps(0)} />
          <Tab label="Costos" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
          <div>
            <ResultItem
              symbol="P0"
              label="Probabilidad de hallar el sistema vacío"
              value={result?.p0.toFixed(5)}
            />
            <ResultItem
              symbol="Pk"
              label="La probabilidad de que un usuario que llega tenga que esperar (k o más)"
              value={result?.pk.toFixed(5)}
            />
            <ResultItem
              symbol="Pne"
              label="Probabilidad de que un usuario que llega no tenga que esperar"
              value={result?.pne.toFixed(5)}
            />
            <ResultItem
              symbol="Pn"
              label={labelPn}
              value={result?.pn.toFixed(5)}
            />
            <ResultItem
              symbol="L"
              label="El número esperado de clientes en el sistema"
              value={result?.l.toFixed(5)}
            />
          </div>
          <div>
            <ResultItem
              symbol="Lq"
              label="El número esperado de clientes en la cola"
              value={result?.lq.toFixed(5)}
            />
            <ResultItem
              symbol="Ln"
              label="El número esperado de clientes en la cola no vacía"
              value={result?.ln.toFixed(5)}
            />
            <ResultItem
              symbol="W"
              label="El tiempo promedio esperado en el sistema por los clientes"
              value={result?.w.toFixed(5)}
            />
            <ResultItem
              symbol="Wq"
              label="El tiempo esperado en la cola por los clientes"
              value={result?.wq.toFixed(5)}
            />
            <ResultItem
              symbol="Wn"
              label="El tiempo esperado en la cola para colas no vacías por los clientes"
              value={result?.wn.toFixed(5)}
            />
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CostTab mmk={result} />
      </TabPanel>
    </>
  );
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}



export default TabsMMK;
