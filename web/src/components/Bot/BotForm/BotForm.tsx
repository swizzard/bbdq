import type { EditBotById, UpdateBotInput } from 'types/graphql'

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
} from '@redwoodjs/forms'

type FormBot = NonNullable<EditBotById['bot']>

interface BotFormProps {
  bot?: EditBotById['bot']
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
          name="grammar"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Grammar
        </Label>

        <TextField
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

        <TextField
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

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-0"
            name="schedule"
            defaultValue="EVERY_10_MINUTES"
            defaultChecked={props.bot?.schedule?.includes('EVERY_10_MINUTES')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 10_minutes</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-1"
            name="schedule"
            defaultValue="EVERY_30_MINUTES"
            defaultChecked={props.bot?.schedule?.includes('EVERY_30_MINUTES')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 30_minutes</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-2"
            name="schedule"
            defaultValue="EVERY_1_HOURS"
            defaultChecked={props.bot?.schedule?.includes('EVERY_1_HOURS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 1_hours</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-3"
            name="schedule"
            defaultValue="EVERY_2_HOURS"
            defaultChecked={props.bot?.schedule?.includes('EVERY_2_HOURS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 2_hours</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-4"
            name="schedule"
            defaultValue="EVERY_6_HOURS"
            defaultChecked={props.bot?.schedule?.includes('EVERY_6_HOURS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 6_hours</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-5"
            name="schedule"
            defaultValue="EVERY_12_HOURS"
            defaultChecked={props.bot?.schedule?.includes('EVERY_12_HOURS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 12_hours</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-6"
            name="schedule"
            defaultValue="EVERY_1_DAYS"
            defaultChecked={props.bot?.schedule?.includes('EVERY_1_DAYS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 1_days</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-7"
            name="schedule"
            defaultValue="EVERY_2_DAYS"
            defaultChecked={props.bot?.schedule?.includes('EVERY_2_DAYS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 2_days</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="bot-schedule-8"
            name="schedule"
            defaultValue="EVERY_1_WEEKS"
            defaultChecked={props.bot?.schedule?.includes('EVERY_1_WEEKS')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Every 1_weeks</div>
        </div>

        <FieldError name="schedule" className="rw-field-error" />

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
