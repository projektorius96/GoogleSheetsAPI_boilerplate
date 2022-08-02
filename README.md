All credits to [[the fusebit tutorial](https://fusebit.io/blog/google-sheets-api-tutorial/?utm_source=search.brave.com&utm_medium=referral&utm_campaign=none)]

---

### Prereqs :

1) `npm ci` to install exact dependency versions from package-lock.json

2) You must share the sheet's file spreadsheetId@string on Google Drive to the service account provided on Google Cloud Console (hereinafter – GCC) at IAM section (Service Accounts)

3) Once steps 1 & 2 completed, run the command `npm run dev` 

> NOTE : make sure the port in the index.js is freed (unallocated) on your OS, to db-check the port is free , use the command (Windows-oriented solution) : `netstat -an | grep ':443'` # instead of 443 put any other required port to check

---

### Other documentation

- Scopes to match against the ones granted through Google Cloud Console [[list of scopes](https://developers.google.com/identity/protocols/oauth2/scopes#sheets)]

- Google Sheets REST API : basic reading, writing, etc [[generic reference](https://developers.google.com/sheets/api/samples/reading?hl=en)]

- Sheets API -> Reference -> Method : spreadsheets.values.get [[reference](https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get?hl=en)]
  - Sheets API glossary, cells, ranges, ranges notation, etc. [[reference](https://developers.google.com/sheets/api/guides/concepts#cell)]