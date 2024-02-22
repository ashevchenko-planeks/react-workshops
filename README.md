# Install

`npm i`

# Run

`npm run dev`

# Homework

## User update

1. Update user information and if user has 'admin' role, display "Delete" button on each video. Otherwise, hide "Delete" button

Changes:

1. Created currentUser context that return user and method for changing user
2. Conditionally render Delete button only if user is `admin`
3. Switched Sidebar to also work with context

## ProductForm

Create ProductForm component where you will pass array of fields:

1. Name - input
2. Price - input
3. Categories - select
   3.1 When you select "Category 1" - nothing should be changed
   3.2 When you select "Category 2" - u should render new select "Subcategory"

## Table

Create generic component Table where you will pass props:
1. columns - it is an array of columns. Column definition:
   2. header - what should component render at the top of table 
   3. accessor - the key of field in data object
   4. render - optional function that will render some component that you will define 
2. data - array of objects with data that should be represented in table

You have to create a page where you will render this Table component and add column "Actions" where you will render "Edit" and "Delete" buttons.
By clicking on "Edit" button you should open dialog with form, with prefilled form. Any other logic you can implement if you want
By clicking on "Delete" button you should open dialog that will ask user "Are you sure you wanna delete {ProductName (or some other field that you like)}". By clicking "Delete" or "Cancel" just close dialog
