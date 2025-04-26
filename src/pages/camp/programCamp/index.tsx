import { useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router';
import { Route } from '../+types';
import imgUrlBack from '../../../assets/program_camp.jpg';
import Setting from '../../../assets/setting.svg?react';
import RoundAdd from '../../../assets/roundAdd.svg?react';
import { useUser } from '../../../context';
import { Modal } from '../../../templates/modal';
import { IProgram } from '../interfaces';
import { creatorRequest } from '../../../api';
import { api } from '../../../api/api';
import { Control } from '../../../templates/controlArrow';
import { useDeviceDetect } from '../../../hooks';
import { useSwipeable } from 'react-swipeable';
import { Dots } from '../../../templates/Dots';
import styles from '../index.module.css';

export const ProgramCamp = () => {
  const { camp } = useLoaderData<Route.ComponentProps['loaderData']>();
  const revalidator = useRevalidator();
  const { isMobile } = useDeviceDetect();

  const { logout, isAdmin } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [currentProgram, setProgram] = useState<IProgram | null>(null);
  const [startIndex, setStartIndex] = useState(0);

  const programsLength = camp?.program?.programs?.length || 0;

  const onLeft = () => {
    if (programsLength <= 4) return;
    if (startIndex === 0) return;
    setStartIndex(startIndex - 1);
  };

  const onRight = () => {
    if (programsLength <= 4) return;
    if (startIndex + 4 === programsLength) return;
    setStartIndex(startIndex + 1);
  };

  const closeModal = () => {
    setProgram(null);
    setOpen(false);
  };

  const openModal = (program?: IProgram) => {
    const programTemp = {
      id: program?.id ? program.id : null,
      dayOfWeek: program?.dayOfWeek || '',
      info: program?.info || '',
      order: program ? program.order : programsLength + 1,
      campId: program ? program.campId : camp?.id,
    } as IProgram;

    setProgram(programTemp);
    setOpen(true);
  };

  const updateProgram = () => {
    if (!currentProgram?.dayOfWeek) return;
    const updP = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(api.updateProgram(currentProgram));
      if (!error) {
        closeModal();
        revalidator.revalidate();
      }
    };
    updP();
  };

  const deleteProgram = () => {
    const updP = async () => {
      const axiosCall = creatorRequest(logout);
      const { error } = await axiosCall(api.deleteProgram(currentProgram.id));
      if (!error) {
        closeModal();
        revalidator.revalidate();
        setStartIndex(0);
      }
    };
    updP();
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const onLeftM = () => {
    if (!camp?.program?.programs?.length) return;
    setCurrentIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const onRightM = () => {
    if (!camp?.program?.programs?.length) return;
    if (currentIndex < camp?.program?.programs?.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: onRightM,
    onSwipedRight: onLeftM,
    trackMouse: true,
  });

  return (
    <div>
      {isOpen ? (
        <Modal
          isOpen={isOpen}
          close={closeModal}
          header={<h2>Программа кемпа</h2>}
          footer={
            <div className={styles.activity_footer}>
              <button onClick={updateProgram} className={styles.button}>
                {'Сохранить'}
              </button>
              {currentProgram?.id ? (
                <button onClick={deleteProgram} className={styles.button}>
                  {'Удалить карточку'}
                </button>
              ) : null}
            </div>
          }
        >
          <div className={styles.add_user_modal}>
            <label>{'День'}</label>
            <input
              value={currentProgram?.dayOfWeek}
              className={styles.input_field_small}
              onChange={(e) => {
                setProgram((prevU) => ({
                  ...prevU,
                  dayOfWeek: e.target.value,
                }));
              }}
            />
            <label>{'Расписание на день'}</label>
            <textarea
              value={currentProgram?.info}
              className={styles.input_field_area}
              onChange={(e) => {
                setProgram((prevU) => ({
                  ...prevU,
                  info: e.target.value,
                }));
              }}
            />
          </div>
        </Modal>
      ) : null}

      <h2
        className={
          isMobile ? styles.camp_info_title_mobi : styles.camp_info_title
        }
      >
        Программа кемпа
      </h2>
      <div
        className={isMobile ? styles.programs_wrap_mobi : styles.programs_wrap}
      >
        {isMobile ? (
          <div {...swipeHandlers}>
            {camp?.program?.programs?.length ? (
              <>
                <div
                  key={camp.program.programs[currentIndex].id}
                  className={styles.program_card_mobi}
                >
                  <img src={imgUrlBack} className={styles.back_card} />
                  <h4 className={styles.program_header_mobi}>
                    {camp.program.programs[currentIndex].dayOfWeek}
                  </h4>
                  <ul className={styles.program_info_list}>
                    {camp.program.programs[currentIndex].info
                      .split(';')
                      .map((p, i) => {
                        return (
                          <li key={i} className={styles.program_info_mobi}>
                            {p}
                          </li>
                        );
                      })}
                  </ul>
                </div>

                <Dots
                  currentIndex={currentIndex}
                  listLength={camp.program.programs.length}
                />
              </>
            ) : null}
          </div>
        ) : (
          <>
            <Control
              show={programsLength > 4}
              onLeft={onLeft}
              onRight={onRight}
            />
            {camp?.program?.programs
              ?.filter((_, i) => i >= startIndex && i + 1 <= startIndex + 4)
              .map((program) => {
                return (
                  <div key={program.id} className={styles.program_card}>
                    <img src={imgUrlBack} className={styles.back_card} />
                    <h4 className={styles.program_header}>
                      {program.dayOfWeek}
                      {isAdmin ? (
                        <Setting
                          onClick={() => openModal(program)}
                          className={styles.setting}
                        />
                      ) : null}
                    </h4>
                    <ul className={styles.program_info_list}>
                      {program.info.split(';').map((p, i) => {
                        return (
                          <li key={i} className={styles.program_info}>
                            {p}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
          </>
        )}

        {isAdmin ? (
          <div className={styles.program_card_add}>
            <RoundAdd onClick={() => openModal()} />
          </div>
        ) : null}
      </div>
    </div>
  );
};
