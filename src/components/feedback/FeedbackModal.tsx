import { Dialog, Transition } from '@headlessui/react';
import { FormEvent, Fragment, useState } from 'react';
import { Result } from '../../constants/Interfaces';
import FeedbackSelect from './FeedbackSelect';

const reasons = [{ reason: 'Transcription Error' }, { reason: 'Other' }];

type Props = {
  result: Result;
  language: string;
};

export default function FeedbackModal({ result, language }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issueURL, setIssueURL] = useState('');

  const [selectedReason, setSelectedReason] = useState(reasons[0]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    const res = await fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        ...Object.fromEntries(new FormData(e.target as HTMLFormElement)),
        reason: selectedReason.reason,
        result,
        language,
      }),
    });
    const data = await res.json();

    setIssueURL(data.url);
    setIsSubmitting(false);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIssueURL('');
    setIsSubmitting(false);
    setIsOpen(true);
  }

  return (
    <>
      <div className='absolute flex items-center justify-center bottom-2 inset-x-2'>
        <button
          type='button'
          onClick={openModal}
          className='w-full px-4 py-2 text-sm font-bold text-blue-500 transition-colors rounded-md hover:bg-blue-200 hover:text-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        >
          Give Feedback
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto transition-opacity bg-black bg-opacity-25'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              {!issueURL ? (
                <form
                  onSubmit={handleSubmit}
                  className='inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'
                >
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Submit Feedback
                  </Dialog.Title>
                  <div className='mt-2 mb-4'>
                    <p className='text-sm text-gray-500'>
                      Report transcription errors or give feedback below. Any
                      inputted text will be attached to help us diagnose errors.
                    </p>
                    <a
                      href='https://github.com/hfellerhoff/openipa/issues'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-sm font-bold text-blue-500'
                    >
                      View known issues →
                    </a>
                  </div>
                  <FeedbackSelect
                    reasons={reasons}
                    selected={selectedReason}
                    setSelected={setSelectedReason}
                  />
                  <fieldset className='mt-4'>
                    <label className='text-gray-700'>
                      Anything else to add?
                    </label>
                    <textarea
                      name='details'
                      rows={4}
                      className='w-full py-2 pl-3 pr-10 mt-2 text-left bg-white border-2 rounded-lg cursor-text focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm'
                      placeholder="The word ______ isn't transcribed correctly..."
                    />
                  </fieldset>
                  <div className='mt-4'>
                    <button
                      type='submit'
                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    >
                      {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center px-4 py-2 ml-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </form>
              ) : (
                <div className='inline-block w-full max-w-lg p-6 py-10 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                  <h4 className='mb-6'>Success! Your feedback was sent.</h4>
                  <div className='flex items-center justify-center gap-1'>
                    <a
                      href={issueURL}
                      target='blank'
                      rel='noopener noreferrer'
                      className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                    >
                      View Feedback
                    </a>
                    <button
                      onClick={closeModal}
                      className='inline-flex justify-center px-4 py-2 ml-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500'
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
