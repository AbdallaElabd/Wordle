import { useToastProvider } from 'components/ToastProvider'

import { AbsoluteContainer, ToastContainer, ToastsList } from './styled'

export const Error = () => {
  const { toasts, onToastFadeOutDone } = useToastProvider()

  return (
    <AbsoluteContainer>
      <ToastsList>
        {toasts.map((toast, index) => (
          <ToastContainer
            key={toast.id}
            index={index}
            toast={toast}
            onAnimationEnd={() => toast.fadeOut && onToastFadeOutDone(toast.id)}
          >
            {toast.message}
          </ToastContainer>
        ))}
      </ToastsList>
    </AbsoluteContainer>
  )
}
