import React from "react";
import { Box, Typography } from '@mui/material';
import Navbar from '@computerEngineering/components/Navbar';
import Footer from "@computerEngineering/components/Footer";
import News from "@computerEngineering/components/News";
import Image from 'next/image';

const Newsdetails: React.FC = () => (
  <>
    <Navbar />

    <Box sx={{
      width: { xs: '95%', sm: '90%', md: '80%' }, minHeight: '10vh', display: 'flex',
      flexWrap: 'wrap', alignItems: 'center', gap: '1.5625rem', justifyContent: 'center', margin: 'auto', padding: '2rem 0'
    }}>
      <Typography component="h2" sx={{ fontSize: { xs: '1.75rem', sm: '2.75rem', md: '3.75rem' }, lineHeight: { xs: '2.625rem', sm: '3.625rem', md: '5.625rem' } }}>Section 1.10.32 of &quot;de Finibus Bonorum et Malorum&quot;, written by Cicero in 45 BC</Typography>

      <Box sx={{ width: '100%', height: '100vh', position: 'relative' }}>
        <Image
          src="/images/abcd.png"
          alt="light"
          layout="fill"
          objectFit="cover"
          style={{
            borderRadius: '1.25rem',
          }}
        />
      </Box>
      <Box>
        <Typography component="p">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim.
        </Typography>
        <Typography component="p">
          ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariaturatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </Typography>
        <Typography component="p">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
          ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam
          nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur&quotSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliqua.
        </Typography>
      </Box>

    </Box>
    <News />
    <Footer />
  </>
);

export default Newsdetails;