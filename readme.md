# About 
The Budget And Expense App


# Setup

The app is setup for SQLite by default and uses Prisma(can be converted if desired)
Update DATABASE_URL in env

## Setup with database already setup
run:
```
npm install 
npx run build
```
## Setup without database
run:
``` 
npm install
npx prisma init
npx prisma generate
```
Update DATABASE_URL in env
```
npx run build
```
