
import { DisplayName, Rules, Validate } from "../../../core";
import { InputField } from "../../../core/decorators/validate.decorator";

@Validate()
export class EmailDTO {

    @DisplayName('Email Subject')
    @Rules(`required`)
    @InputField()
    public subject: string;

    @DisplayName('Email Body')
    @Rules('required')
    @InputField()
    public body: string;

    @DisplayName('Send To')
    @Rules(`required`)
    @InputField()
    public send_to: string;

    @DisplayName('From Email')
    @Rules(`required`)
    @InputField()
    public from_email: string;
}
