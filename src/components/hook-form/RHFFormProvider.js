import React from 'react'
import { FormProvider } from 'react-hook-form'
import PropTypes from 'prop-types'

RHFFormProvider.propTypes={
    methods:PropTypes.object.isRequired,
    children:PropTypes.node.isRequired,
    onSubmit:PropTypes.func
}
export default function RHFFormProvider({methods,children,onSubmit}){
    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                {children}
            </form>
        </FormProvider>
    )
}