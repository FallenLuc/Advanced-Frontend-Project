import type { FC } from "react"
import { lazy } from "react"
import type { RegistrationFormProps } from "./RegistrationForm"

const RegistrationFormAsync = lazy<FC<RegistrationFormProps>>(() => import("./RegistrationForm"))

export { RegistrationFormAsync as RegistrationForm }
