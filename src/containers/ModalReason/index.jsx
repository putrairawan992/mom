import React ,{ useState } from 'react'
import propTypes from 'prop-types'
import { Formik } from 'formik'
import Button from '../../components/Button'
import { Modal as ModalAnt, Row, Col, Select, Form, Input } from 'antd'
import * as yup from 'yup'
import TextArea from '../../components/TextArea'
import './style.sass'

const Option = Select.Option;

const Modal = ({visible, onSubmit, onCancel, loading, invoiceId, options, title,buttonTitle, max}) => {
    const [schema, SetSchema] = useState(
			yup.object().shape({
					reason: yup.string(),
					note: yup.string()
			})
    )

		const updateSchema = optionReason => {
			optionReason === options[options.length - 1].value
			? SetSchema(
				yup.object().shape({
					reason: yup.string(),
					note: yup.string().required("Please write the detail of cancelation")
				})
			)
			: SetSchema(
				yup.object().shape({
					reason: yup.string(),
					note: yup.string()
				})
			)
		}

    return (
			<ModalAnt
					visible={visible}
					title={<span className="title-modal-danger">{title}</span>}
					onOK={onSubmit}
					onCancel={onCancel}
					closable={false}
					footer={null}
			>
				<Formik
					initialValues={{reason: options ? options[0].value : "default", note: ""}}
					onSubmit={values => {
						onSubmit({ ...values, invoiceId})
					}}
					validationSchema={schema}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						setFieldValue,
						handleBlur,
						handleSubmit
					}) => (
						<Form onSubmit={handleSubmit}>
							<Row>
								<Col>
									<span className="label-reason">Cancellation Category</span>
										<Select
											onChange={value => {
												updateSchema(value)
												setFieldValue("reason",value)
											}}
											name="reason"
											value={values.reason}
											className="select-reason-undo"
											size="large"
										>
											{options.map((option,index) => {
												return (
													<Option key={index} value={option.value}>
														{option.name}
													</Option>
												)
											})}
										</Select>
								</Col>
							</Row>
							<Row className="row-item-undo">
								<Col>
									<TextArea
										name="note"
										placeholder="Write some notes here"
										autosize={{ minRows: 6, maxRows: 6}}
										onChange={handleChange}
										value={values.note}
										maxLength={max}
										type={errors.note && touched.note ? "error" : "default"}
										// className={errors.note && touched.note && "input-error"}
									/>
								</Col>
							</Row>
							<Row
								className={
									errors.note && touched.note ? "row-button-error" : "row-button"
								}
								type="flex"
								justify="end"
							>
								<Col>
									<Button
										onClick={onCancel}
										type="link"
									>Cancel</Button>
									<Button
										htmlType="submit"
										type="danger"
									>
									{buttonTitle}
									</Button>
								</Col>
							</Row>
						</Form>
					)}
				</Formik>
			</ModalAnt>
    )
}

Modal.propTypes = {
	options : propTypes.arrayOf(propTypes.object),
	visible: propTypes.bool,
	onCancel: propTypes.func,
	onSubmit: propTypes.func,
	invoiceId : propTypes.string,
	title : propTypes.string,
	buttonTitle: propTypes.string,
	max: propTypes.number

}

export default Modal