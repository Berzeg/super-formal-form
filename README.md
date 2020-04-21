# @super-formal/form

A react component for creating highly customizable and shareable forms.

## Index

- [Installation](#instllation)
- [Basic Usage](#basic-usage)
- [Motivation](#motivation)
- [The `Form` Component](#the-form-component)
  - [`structure` prop](#structure-prop)
  - [`builders` prop](#builders-prop)
  - [`adapters` prop](#adapters-prop)
  - [`state` prop](#state-prop)
  - [`reactions` prop](#reactions-prop)

## Installation

Using npm:

```
npm i -g npm
npm i --save @super-formal/form
```

Using yarn:

```
yarn add @super-formal/form
```

## Basic Usage

After installing the package you can use it in your React project as follows:

```
import Form from '@super-formal/form';

// a simple functional component for a field
function Field(props) {
  return (
    <div>
      <p>Test Field: {props.value}</p>
    </div>
  );
}

// inside your render() function
<Form
  structure={[
    {type: 'field', id: 'fieldA'},
    {type: 'field', id: 'fieldB'},
  ]}
  builders={{
    'field': Field,
  }}
  adapters={{
    'fieldA': (state) => ({value: state.stateA}),
    'fieldB': (state) => ({value: state.stateB}),
  }}
  state={{
    'fieldA': {stateA: 'valueA'},
    'fieldB': {stateB: 'valueB'},
  }}
  reactions={{}}
/>
```

## Motivation

Creating single-purpose, single-use forms is straight-forward. It is often one of the first thing we do when we create a React app. Also, it is often one of the first tasks we under-estimate in terms of time and effort. The `@super-formal/form` intends to make it easy to create highly-customizable React forms for the purpose of sharing them with others.

TLDR: Create forms to get things going quick, and keep them going well.

## The `Form` Component

### `structure` prop

`{Array<Object<type: String, id: String>>}` - required - The `structure` property dictates what the form will look like: what fields it will have and the order in which those fields should appear. The `type` property of each `structure` entry is a string that describes the type of field to be used (e.g. `"text", "date-picker", "my custom type name"`). The `id` property is used to identify each field in the form. Therefore, it is necessary that each `structure` entry has a unique `id` value.

For example, a log in form may have the following structure:

```
<Form
  structure={[
      {type: "text", id: "email"},
      {type: "text", id: "password"},
      {type: "button", id: "submit"}
    ]}
  ...otherProps
/>
```

Note that the form itself has an id, which can be customized with the `formID` property. The `formID` value should not be used by any other field in the form's `structure`.

### `builders` prop

`{Object<String: Function>}` - required - The `builders` property tells the `Form` component which React component corresponds to each type mentioned in the `structure` property. For instance, if you have a structure that looks like this:

```
structure={[
  {type: "text", id: "email"},
  {type: "datepicker", id: "dob"},
  {type: "button", id: "submit"}
]}
```

then the `builders` property should include at least three entries with the keys: `"text"`, `"datepicker"`, and `"button"`. Like so:

```
// import TextInput from somewhere
// import DatePicker from somewhere
// import Button from somewhere

<Form
  structure={[
    {type: "text", id: "email"},
    {type: "datepicker", id: "dob"},
    {type: "button", id: "submit"}
  ]}
  builders={{
    text: TextInput,
    datepicker: DatePicker,
    button: Button,
  }}
  ...otherProps
/>
```

### `adapters` prop

`Object<String, Function>` - optional - The `adapters` property has `String` keys, which correspond to the field `id`s declared in the `Form`'s `structure` property. The value of each `adapter` is a function with the signature `(Object) => Object`. The input for each adapter is an object with all the entires in `state` and `reaction` for that field. Its job is to return a properties object that can be used by the corresponding React Component representing that field.

For instance, say we are using the following React component:

```
<TextField
  hint={[What the value represents]}
  value={[The text in the field]}
  onChange={[callback to invoke when the value changes]}
/>
```

And say we have the following state and reactions for that field:

```
state={{
  email: {
    name: "email",
    val: "some@email.com",
  }
}}
reactions={{
  email: {
    changeCallback: (event) => {// update val}
  }
}}
```

Then your `Form` should probably look like this:

```
<Form
  structure={[
    {type: "text", id: "email"},
    ...
  ]}
  builders={{
    text: TextField
  }}
  adapters={{
    email: (input) => {
      return {
        hint: input.name, // From state.email
        value: input.val, // From state.email
        onChange: input.changeCallback // From reactions.email
      };
    }
  }}
/>
```

If no adapter is defined for a field then the default adapter is an `identity` adapter. e.g. if you have the following state and reactions for a state:

```
<Form
  structure={[
    {type: "text", id: "email"},
    ...
  ]}
  builders={{
    text: TextField
  }}
  state={{
    email: {
      hint: "Email",
      value: "some@email.com"
    }
  }}
  reactions={{
    email: {
      onChange: reactionA,
    }
  }}
/>
```

then the `Form` will be creating a `TextField` for the `email` field and pass it the following properties:

```
// inside the Form component declared above
<TextField
  hint="Email" // state.email.hint
  value="some@email.com" // state.email.value
  onChange={reactionA converted to a function} // reactions.email.onChange.toFunction()
/>
```

### `state` prop

`{Object<String: Object>}` - optional - The `state` property contains  all the sub-properties to be passed to the fields within the form. Each key in `state` should correspond to the `id` of a field declared in the `structure` property.

For instance, to pass props to the field with `id="password"` you should pass the following state:

```
<Form
  structure={[
    {type: "text", id: "email"},
    {type: "text", id: "password"},
    ...
  ]}
  builders={{
    text: TextField,
    ...
  }}
  state={{
    email: {
      hint: "Email",
      value: "some@email.com"
    },
    password: {
      hint: "Password",
      value: "some-password",
      password: true
    }
  }}
/>
```

### `reactions` prop

`{Object<String: Object<String: (Function|Array<Function>|ChainReaction)>>}` - optional - The `reactions` property contains  all the callback sub-properties to be passed to the fields within the form. Each key in `reactions` should correspond to the `id` of a field declared in the `structure` property. These reactions should be called by the field components.

For instance, to pass callbacks to the field with `id="email"` you should pass the following state:

```
<Form
  structure={[
    {type: "text", id: "email"},
    ...
  ]}
  builders={{
    text: TextField,
    ...
  }}
  state={{
    email: {
      hint: "Email",
      value: "some@email.com"
    },
  }}
  reactions={{
    email: {
      onChange: (event) => *update email value*
    }
  }}
/>
```
