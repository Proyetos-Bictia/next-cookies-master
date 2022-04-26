import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import { Layout } from '../components/layouts';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
  theme: string;
}

const ThemeChangedPage: FC<Props> = (props) => {
  // console.log({ props });
  const [currentTheme, setCurrentTheme] = useState('light');

  const onThemeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentTheme(event.target.value);
    localStorage.setItem('theme', event.target.value);
    Cookies.set('theme', event.target.value)
  }

  useEffect(() => {
    // console.log('LocalStorage', localStorage.getItem('theme'));
    // console.log('Cookies', Cookies.get('theme'));
    setCurrentTheme(props.theme);
  }, []);

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
    console.log(data);
  }

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Tema</FormLabel>
            <RadioGroup
              value={currentTheme}
              onChange={onThemeChange}
            >
              <FormControlLabel
                value='light'
                control={<Radio />}
                label='Light'
              />
              <FormControlLabel
                value='dark'
                control={<Radio />}
                label='Dark'
              />
              <FormControlLabel
                value='custom'
                control={<Radio />}
                label='Custom'
              />
            </RadioGroup>
          </FormControl>

          <Button
            onClick={onClick}
          >
            Solicitud
          </Button>

        </CardContent>
      </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { theme = 'light', name = 'No name' } = req.cookies;

  console.log(req.cookies);

  return {
    props: {
      theme,
      name
    }
  }
}

export default ThemeChangedPage