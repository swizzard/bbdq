import type {
  EditBotByIdentifierAndPassword,
  UpdateBotInput,
} from 'types/graphql'

import type { RWGqlError } from '@redwoodjs/forms'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  CheckboxField,
  RadioField,
  Submit,
  TextAreaField,
  PasswordField,
  SelectField,
} from '@redwoodjs/forms'

type FormBot = NonNullable<EditBotByIdentifierAndPassword['bot']>

interface BotFormProps {
  bot?: EditBotByIdentifierAndPassword['bot']
  onSave: (data: UpdateBotInput, id?: FormBot['id']) => void
  error: RWGqlError
  loading: boolean
}

const BotForm = (props: BotFormProps) => {
  const onSubmit = (data: FormBot) => {
    props.onSave(data, props?.bot?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormBot> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
        <Label
          name="identifier"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Identifier
        </Label>

        <TextField
          name="identifier"
          defaultValue={props.bot?.identifier}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="identifier" className="rw-field-error" />

        <Label
          name="password"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Password
        </Label>

        <PasswordField
          name="password"
          defaultValue={props.bot?.password}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="password" className="rw-field-error" />

        <Label
          name="schedule"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Schedule
        </Label>

        <SelectField
          name="schedule"
          validation={{
            required: true,
            validate: {
              matchesInitialValue: (value: string) =>
                value !== 'Please select a posting schedule' ||
                'Select an Option',
            },
          }}
        >
          <option value="Please select a posting schedule">
            Please select a posting schedule
          </option>
          <option value="EVERY_10_MINUTES">Every 10 minutes</option>
          <option value="EVERY_30_MINUTES">Every 30 minutes</option>
          <option value="EVERY_1_HOURS">Every 1 hours</option>
          <option value="EVERY_2_HOURS">Every 2 hours</option>
          <option value="EVERY_6_HOURS">Every 6 hours</option>
          <option value="EVERY_12_HOURS">Every 12 hours</option>
          <option value="EVERY_1_DAYS">Every 1 days</option>
          <option value="EVERY_2_DAYS">Every 2 days</option>
          <option value="EVERY_1_WEEKS">Every 1 weeks</option>
        </SelectField>

        <FieldError name="schedule" className="rw-field-error" />

        <Label
          name="grammar"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Grammar
        </Label>

        <TextAreaField
          name="grammar"
          defaultValue={props.bot?.grammar}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="grammar" className="rw-field-error" />

        <Label
          name="isPublic"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Is public
        </Label>

        <CheckboxField
          name="isPublic"
          defaultChecked={props.bot?.isPublic}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="isPublic" className="rw-field-error" />

        <Label
          name="enabled"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Enabled
        </Label>

        <CheckboxField
          name="enabled"
          defaultChecked={props.bot?.enabled}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="enabled" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default BotForm
