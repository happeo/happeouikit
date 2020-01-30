# Toast



Installation

    yarn add @happeokit/toast

or 

    npm install --save @happeokit/toast


### Usage

```
// First include the container in the apps root component

// App.js

import {ToastContainer} from '@happeokit/toast';

...

render () {
    <div> /* Main app */ </div>
    <ToastContainer/>
}

// Then call toast methods inside any other components

// Component.js

import {toast} from '@happeokit/toast';
...

const someMethod = () => {
    toast.success({message: "Success message"})
}

```