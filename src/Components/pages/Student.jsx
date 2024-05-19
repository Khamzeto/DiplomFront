import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import Navbar from '../Navbar';
import getCroppedImg64 from '../getImage64';
import Cropper from 'react-easy-crop';
import CustomCheckbox from '../CustomCheckbox';
import { Link, useParams } from 'react-router-dom';

function Student() {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: Number,
    email: '',
  });

  const [success, setSuccess] = useState(false);
  const handleChangeData = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { id } = useParams();
  const [sendModal, setSendModal] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = event => {
    let value = event.target.value;

    if (!value.startsWith('+')) {
      value = '+' + value;
    }

    // Обновляем состояние
    setPhoneNumber(value);
  };

  console.log(id);
  const [student, setStudent] = useState(null);
  console.log(student);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://2983365-dv35082.twc1.net/service/only/${id}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {};
  }, []);

  const sendStudentDetails = async () => {
    try {
      const response = await fetch(`https://2983365-dv35082.twc1.net/connection/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: id,
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }
      setSuccess(true);

      console.log('Данные успешно отправлены');
    } catch (error) {
      console.error('Ошибка при отправке данных:', error.message);
    }
  };

  return (
    <>
      <div className="App w-[100%] h-[100%] ">
        {sendModal && (
          <div className="w-[100%] modal-cont h-[100%] bg-lightBlack  z-[9999] flex justify-center items-center text-left fixed">
            <div class="min-w-[50%] modal-data h-[426px] mx-2  px-5 py-[30px] bg-white rounded-[15px] flex-col justify-center items-start gap-5 inline-flex ">
              <div class="self-stretch h-[77px] flex-col justify-center items-start gap-2.5 flex">
                <div class="self-stretch h-[15px] flex-col justify-start items-start gap-[15px] flex">
                  <button
                    onClick={() => setSendModal(false)}
                    class="self-stretch text-right text-blue-500 text-[13px] font-normal font-['Manrope'] leading-[14.95px]"
                  >
                    Закрыть
                  </button>
                </div>
                <div class="self-stretch h-[52px] flex-col justify-center items-start gap-2.5 flex">
                  <div class="self-stretch main-cont h-[52px] flex-col justify-center items-start gap-[5px] flex">
                    <div class="self-stretch mb-1 h-[29px] flex-col justify-center items-start gap-[15px] flex">
                      <div class="self-stretch input-data text-gray-900 text-[25px] font-bold font-['Manrope'] leading-7">
                        Введите ваши данные
                      </div>
                    </div>
                    <div class="self-stretch desc-data  text-gray-500 text-[15px] font-normal font-['Manrope'] leading-[18px]">
                      Они нужны для того, чтобы мы смогли дать вам обратную связь
                    </div>
                  </div>
                </div>
              </div>
              <div class="self-stretch h-[269px] flex-col justify-center items-start gap-[30px] flex">
                <div class="cont-input self-stretch h-[189px] flex-col justify-center items-start gap-[15px] flex">
                  <div class="fio self-stretch h-[87px] flex-col justify-start items-start gap-2.5 flex">
                    <div class="self-stretch text-gray-900 text-lg font-semibold font-['Manrope'] uppercase">
                      фио
                    </div>
                    <input
                      onChange={handleChangeData}
                      name="fullName"
                      value={formData.fullName}
                      placeholder="Фамилия имя отчество"
                      class="self-stretch h-[52px] px-5 py-[17px] bg-slate-50 rounded-[10px] border border-gray-500 flex-col justify-start items-start gap-2.5 flex"
                    />
                  </div>
                  <div class="self-stretch justify-start items-center gap-3 inline-flex">
                    <div class="grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                      <div class="self-stretch text-gray-900 text-lg font-semibold font-['Manrope']">
                        Номер телефона
                      </div>
                      <input
                        onChange={handleChangeData}
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        type="text"
                        placeholder="+7 123 456 78 90"
                        class="self-stretch h-[52px] px-5 py-[17px] bg-slate-50 rounded-[10px] border border-gray-500 flex-col justify-start items-start gap-2.5 flex"
                      />
                    </div>
                    <div class="desk-email grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                      <div class="self-stretch text-gray-900 text-lg font-bold font-['Manrope'] capitalize">
                        почта
                      </div>
                      <input
                        onChange={handleChangeData}
                        name="email"
                        value={formData.email}
                        type="email"
                        placeholder="mailto@example.mail.ru"
                        class="self-stretch h-[52px] px-5 py-[17px] bg-slate-50 rounded-[10px] border border-gray-500 flex-col justify-start items-start gap-2.5 flex"
                      />
                    </div>
                  </div>
                  <div className="w-[100%]">
                    <div class="mob-email grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                      <div class="self-stretch mb-2  text-gray-900 text-lg font-bold font-['Manrope'] capitalize">
                        почта
                      </div>
                      <input
                        type="email"
                        placeholder="mailto@example.mail.ru"
                        class="self-stretch relative top-[20%] w-[100%] h-[52px] px-5 py-[17px] bg-slate-50 rounded-[10px] border border-gray-500 flex-col justify-start items-start gap-2.5 flex"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-[100%] sendBtn">
                  <button
                    onClick={sendStudentDetails}
                    class="w-[100%] self-stretch px-2.5 py-[15px] bg-blue-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
                  >
                    <div class="text-center text-white text-[15px] font-semibold font-['Manrope'] capitalize">
                      Отправить
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {success && (
          <div className="w-[100%]  h-[100%] bg-lightBlack  z-[9999] flex justify-center items-center text-left fixed">
            <div class="w-[460px] suc-modal  mx-2 h-[281px] px-10 py-[30px] bg-white rounded-[15px] flex-col justify-start items-center gap-[13px] inline-flex">
              <div class="w-20 h-20 relative">
                <div class="w-20 h-20 left-0 top-0 absolute  rounded-full">
                  <img src="/checkBig.svg" />
                </div>
              </div>
              <div class="self-stretch h-32 flex-col justify-start items-center gap-5 flex">
                <div class="self-stretch h-[72px] flex-col justify-start items-center gap-2.5 flex">
                  <div class="self-stretch text-center text-gray-900 text-[23px] font-bold font-['Manrope'] leading-relaxed">
                    Заявка успешно отправлена!
                  </div>
                  <div class="w-[246px] text-center text-gray-500 text-[15px] font-normal font-['Manrope'] leading-[18px]">
                    С вами свяжутся в ближайшее время, ожидайте
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSendModal(false);
                    setSuccess(false);
                  }}
                  class="px-[25px] close-suc relative top-[4%] py-2 bg-blue-500 rounded-lg flex-col justify-center items-center gap-2.5 flex"
                >
                  <div class="self-stretch text-center text-white text-[15px] font-normal font-['Manrope']">
                    Закрыть
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        <Navbar />
        <div>
          <div className="w-[100%]">
            <Link to="/" className="w-[4%] mx-4 items-center flex my-4">
              <img className="min-w-[6px] mx-3" src="/LeftLayer.svg" />
              <div>
                <span>Назад</span>
              </div>
            </Link>
            <div className="w-[100%] h-[100%]">
              <div class="w-[100%] h-[100%] flex-col justify-center items-center gap-2.5 inline-flex">
                <div class="flex-col justify-start items-center gap-2.5 flex">
                  {student?.student.avatar ? (
                    <img
                      class="w-[125px] h-[125px] rounded-[81px]"
                      src={student?.student.avatar}
                    />
                  ) : (
                    <img
                      class="w-[125px] h-[125px] rounded-[81px]"
                      src="https://via.placeholder.com/125x125"
                    />
                  )}
                  <div class="flex-col justify-start items-center gap-[5px] flex">
                    <div class="w-[100%] text-center text-gray-900 text-[25px] font-bold font-['Manrope'] leading-[30px]">
                      {student?.student.name.split(' ').slice(0, 2).join(' ')}
                    </div>

                    <div
                      class={`px-5 py-[5px] rounded-2xl flex-col my-2 justify-center items-center gap-2.5 flex ${
                        student?.student.searchJob == 'Ищет работу'
                          ? 'bg-green-400'
                          : 'bg-red-400'
                      }`}
                    >
                      <div class="self-stretch text-center text-white text-xs font-normal font-Manrope">
                        {student?.student.searchJob}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSendModal(true)}
                  class="w-[20%] mb-[2%] min-w-[280px] h-[50px] px-[25px] py-2.5 bg-blue-500 rounded-[15px] flex-col justify-center items-center gap-2.5 flex"
                >
                  <div class="self-stretch text-center text-white text-[15px] font-normal font-['Manrope']">
                    Связаться{' '}
                  </div>
                </button>
                <div className="w-[100%] ">
                  <div class="w-[50%] min-w-[300px] h-[99px] text-left p-2.5 bg-slate-50 rounded-[25px] border border-neutral-400 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch h-[79px] px-5 py-[15px] flex-col justify-center items-start gap-[5px] flex">
                      <div class="self-stretch textGray text-[15px] font-medium font-['Manrope']">
                        Направление
                      </div>
                      <div class="self-stretch text-gray-900 text-xl font-normal font-['Manrope'] leading-normal">
                        {student?.student.direction}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%] ">
                  <div class="w-[50%] min-w-[300px] h-[99px] text-left p-2.5 bg-slate-50 rounded-[25px] border border-neutral-400 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch h-[79px] px-5 py-[15px] flex-col justify-center items-start gap-[5px] flex">
                      <div class="self-stretch textGray text-[15px] font-medium font-['Manrope']">
                        Средняя оценка
                      </div>
                      <div class="self-stretch text-gray-900 text-xl font-normal font-['Manrope'] leading-normal">
                        {student?.student.grade}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[100%]   ">
                  <div class="w-[50%] min-w-[300px] h-[99px] text-left p-2.5 bg-slate-50 rounded-[25px] border border-neutral-400 flex-col justify-start items-start gap-2.5 inline-flex">
                    <div class="self-stretch h-[79px] px-5 py-[15px] flex-col justify-center items-start gap-[5px] flex">
                      <div class="self-stretch textGray text-[15px] font-medium font-['Manrope']">
                        Наличие красного диплома
                      </div>
                      <div class="self-stretch text-gray-900 text-xl font-normal font-['Manrope'] leading-normal">
                        {student?.student.diploma}
                      </div>
                    </div>

                    <div class="flex w-[100%]  justify-left items-center">
                      <div class=" flex-col text-left ">
                        <div className="my-5">
                          <span class="text-gray-900 text-xl  font-bold font-Manrope leading-normal">
                            Возраст:{' '}
                          </span>
                          <span class="text-gray-900 text-xl font-normal font-Manrope leading-normal">
                            {student?.student.age}
                          </span>
                        </div>
                        <div class="w-[100%] my-5">
                          <span class="text-gray-900 text-xl font-bold font-Manrope leading-normal">
                            Краткая биография
                          </span>
                        </div>
                        <div class="w-[100%] my-5 text-neutral-600 text-[17px] font-normal font-['Manrope'] leading-tight">
                          {student?.student.biography}
                        </div>
                        <div class="w-[100%]  mt-[5%] text-gray-900 text-xl font-semibold font-['Manrope'] leading-normal">
                          Навыки
                        </div>
                        <div className="flex my-2 justify-start flex-wrap w-[80%]">
                          {student?.student.skills[0] &&
                            JSON.parse(student.student.skills[0]).map((skills, index) => (
                              <div key={index} className={`w-[50%] md:w-[33.33%]`}>
                                <div className="w-[100px] text-blue-500 my-2 h-10 px-[25px] py-2.5 bg-blue-500 bg-opacity-20 rounded-[25px] flex justify-center items-center">
                                  {skills}
                                </div>
                              </div>
                            ))}
                        </div>
                        <div class="w-[100%] my-5">
                          <span class="text-gray-900 text-xl font-bold font-Manrope leading-normal">
                            Научные и творческие работы
                          </span>
                          <div class="w-[100%] my-5 text-neutral-600 text-[17px] font-normal font-['Manrope'] leading-tight">
                            {student?.student.work}
                          </div>
                        </div>
                        <div class="w-[100%] my-5 mb-[10%]">
                          <span class="text-gray-900 text-xl font-bold font-Manrope leading-normal">
                            Достижения
                          </span>
                          <div class="w-[100%] my-5 text-neutral-600 text-[17px] font-normal font-['Manrope'] leading-tight">
                            {student?.student.achievements}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Student;
