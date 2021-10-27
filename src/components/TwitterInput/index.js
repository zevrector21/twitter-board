import React, { Component } from 'react'
import { Form, Input } from 'antd'


function TwitterInput(props) {

  const {
    label,
    field,
    required,
    type,
    maxLength,
    placeholder,
    min,
    max,
    inactive,
    disabled,
    pattern,
    customValidator,
    style
  } = props

  const name = field? field.split('.'): 'default';
  let rules = [];
  if (!disabled)
    rules = [
      {
        required: required,
        message: 'Invalid',
      }]
    if (customValidator)
      rules.push(customValidator)

  return (
      <Form.Item label={label} name={name}
        className={inactive? 'inactive-item': ''}
        rules={rules}
        style={style}
      >
        <Input type={type} placeholder={placeholder} maxLength={maxLength} min={min} max={max} disabled={disabled}/>
      </Form.Item>
    )
}

export default TwitterInput
