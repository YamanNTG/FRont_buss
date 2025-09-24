import { Button } from '@/components/ui/button';
import { useNavigation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

type SubmitBtnProps = {
  text?: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  loadingText?: string;
};

const SubmitBtn = ({
  text,
  className,
  disabled = false,
  isLoading = false,
  loadingText = 'Loading...',
}: SubmitBtnProps) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const showSpinner = isLoading || isSubmitting;

  return (
    <Button
      type="submit"
      className={`w-full ${className || ''}`}
      disabled={disabled || showSpinner}
    >
      {showSpinner ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        text || 'submit'
      )}
    </Button>
  );
};

export default SubmitBtn;
