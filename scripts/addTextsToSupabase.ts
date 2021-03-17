const cpdlGetTexts = require('./src/lib/supabase/cpdl/cpdlGetTexts');

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const fetchWorks = async () => {
  // Get works to fetch from file
  const filename = './scripts/textsToAdd.txt';
  fs.readFile(filename, 'utf8', async function (err, data) {
    if (err) throw err;

    const worksToFetch = data.split('\n');
    console.log(worksToFetch);

    // Get current texts
    const res = await supabase.from('texts').select('*');
    // const works = res.body;

    // Search for work
    const result = await cpdlGetTexts(worksToFetch[0]);
    console.log(result);
  });
};

fetchWorks();
