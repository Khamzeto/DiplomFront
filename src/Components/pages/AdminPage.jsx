import { useEffect, useState } from 'react';
import AddModal from '../AddModal/AddModal';
import Navbar from '../Navbar';
import getCroppedImg64 from '../getImage64';
import Cropper from 'react-easy-crop';
import CustomCheckbox from '../CustomCheckbox';
import { Link } from 'react-router-dom';
import CheckboxDiplom from '../CheckboxDiplom';

function AdminPage() {
  const [column, setColumn] = useState(true);
  const [filters, setFilters] = useState(false);
  const [isConsideredChecked, setIsConsideredChecked] = useState(false);
  const [isNotConsideredChecked, setIsNotConsideredChecked] = useState(false);

  // Для флажка "Учитывать"
  const handleConsideredChange = () => {
    setIsConsideredChecked(prev => !prev);
    setIsNotConsideredChecked(false); // Убираем выбор у флажка "Не учитывать"
  };

  // Для флажка "Не учитывать"
  const handleNotConsideredChange = () => {
    setIsNotConsideredChecked(prev => !prev);
    setIsConsideredChecked(false); // Убираем выбор у флажка "Учитывать"
  };

  const onlyCol = () => {
    setColumn(false);
  };
  const [checkboxes, setCheckboxes] = useState([
    { id: 1, label: 'Агрономия', isChecked: false },
    { id: 2, label: 'Программная инженерия', isChecked: false },
  ]);

  const [faculties, setFaculties] = useState([
    {
      id: 1,
      name: 'Агротехнологический институт',
      directions: [
        { id: 1, name: 'Агрономия', isChecked: false },
        { id: 2, name: 'Ветеринарно-санитарная экспертиза', isChecked: false },
        { id: 3, name: 'Зоотехния', isChecked: false },
        { id: 4, name: 'Садоводство', isChecked: false },
        {
          id: 5,
          name: 'Технология производства и переработки сельскохозяйственной продукции',
          isChecked: false,
        },
      ],
    },
    {
      id: 2,
      name: 'Биолого-химический факультет',
      directions: [
        { id: 6, name: 'Биология', isChecked: false },
        { id: 7, name: 'Химия', isChecked: false },
      ],
    },
    {
      id: 3,
      name: 'Факультет географии и геоэкологии',
      directions: [
        { id: 8, name: 'География', isChecked: false },
        { id: 9, name: 'Гидрометеорология', isChecked: false },
        { id: 10, name: 'Дизайн архитектурной среды', isChecked: false },
        { id: 11, name: 'Картография и геоинформатика', isChecked: false },
        { id: 12, name: 'Нефтегазовое дело', isChecked: false },
        { id: 13, name: 'Сервис', isChecked: false },
        { id: 14, name: 'Туризм', isChecked: false },
        { id: 15, name: 'Экология и природопользование', isChecked: false },
      ],
    },
    {
      id: 4,
      name: 'Факультет иностранных языков',
      directions: [{ id: 16, name: 'Лингвистика', isChecked: false }],
    },
    {
      id: 5,
      name: 'Филологический факультет',
      directions: [
        { id: 17, name: 'Журналистика', isChecked: false },
        { id: 18, name: 'Психология', isChecked: false },
        { id: 19, name: 'Психолого-педагогическое образование', isChecked: false },
        { id: 20, name: 'Филология', isChecked: false },
      ],
    },
    {
      id: 6,
      name: 'Исторический факультет',
      directions: [
        { id: 21, name: 'Зарубежное регионоведение', isChecked: false },
        { id: 22, name: 'История', isChecked: false },
        { id: 23, name: 'Культурология', isChecked: false },
        {
          id: 24,
          name: 'Музеология и охрана объектов культурного и природного наследия',
          isChecked: false,
        },
      ],
    },
    {
      id: 7,
      name: 'Медицинский институт',
      directions: [
        { id: 25, name: 'Лечебное дело', isChecked: false },
        { id: 26, name: 'Медико-профилактическое дело', isChecked: false },
        { id: 27, name: 'Медицинская биофизика', isChecked: false },
        { id: 28, name: 'Медицинская биохимия', isChecked: false },
        { id: 29, name: 'Педиатрия', isChecked: false },
        { id: 30, name: 'Стоматология', isChecked: false },
        { id: 31, name: 'Фармация', isChecked: false },
      ],
    },
    {
      id: 8,
      name: 'Факультет государственного управления',
      directions: [
        { id: 32, name: 'Государственное и муниципальное управление', isChecked: false },
        { id: 33, name: 'Менеджмент', isChecked: false },
        { id: 34, name: 'Управление персоналом', isChecked: false },
      ],
    },
    {
      id: 9,
      name: 'Институт математики, физики и информационных технологий',
      directions: [
        { id: 35, name: 'Бизнес-информатика', isChecked: false },
        {
          id: 36,
          name: 'Инфокоммуникационные технологии и системы связи',
          isChecked: false,
        },
        { id: 37, name: 'Информатика и вычислительная техника', isChecked: false },
        { id: 38, name: 'Информационная безопасность', isChecked: false },
        { id: 39, name: 'Математика', isChecked: false },
        { id: 40, name: 'Прикладная математика и информатика', isChecked: false },
        { id: 41, name: 'Программная инженерия', isChecked: false },
        { id: 42, name: 'Радиофизика', isChecked: false },
        { id: 43, name: 'Физика', isChecked: false },
      ],
    },
    {
      id: 10,
      name: 'Институт экономики и финансов',
      directions: [
        { id: 44, name: 'Торговое дело', isChecked: false },
        { id: 45, name: 'Финансы и кредит', isChecked: false },
        { id: 46, name: 'Экономика', isChecked: false },
      ],
    },
    {
      id: 11,
      name: 'Юридический факультет',
      directions: [
        { id: 47, name: 'Социальная работа', isChecked: false },
        { id: 48, name: 'Юриспруденция', isChecked: false },
      ],
    },
  ]);

  const handleCheckboxChange = (facultyId, directionId) => {
    setFaculties(prevFaculties =>
      prevFaculties.map(faculty => {
        if (faculty.id === facultyId) {
          return {
            ...faculty,
            directions: faculty.directions.map(direction =>
              direction.id === directionId
                ? { ...direction, isChecked: !direction.isChecked }
                : direction
            ),
          };
        } else {
          return faculty;
        }
      })
    );
  };

  const handleDirectionsChange = (facultyId, directionId) => {
    setFaculties(prevFaculties =>
      prevFaculties.map(faculty => {
        if (facultyId !== null && faculty.id !== facultyId) {
          return faculty;
        }
        return {
          ...faculty,
          directions: faculty.directions.map(direction =>
            direction.id === directionId
              ? { ...direction, isChecked: !direction.isChecked }
              : direction
          ),
        };
      })
    );
  };

  const [openFacultyIds, setOpenFacultyIds] = useState([]);

  const handleFacultyClick = facultyId => {
    setOpenFacultyIds(prevIds => {
      if (prevIds.includes(facultyId)) {
        // Если факультет уже открыт, удаляем его из массива
        return prevIds.filter(id => id !== facultyId);
      } else {
        // Если факультет еще не открыт, добавляем его в массив
        return [...prevIds, facultyId];
      }
    });
  };

  const [students, setStudents] = useState([]);

  let filteredStudents = students;
  if (isConsideredChecked) {
    filteredStudents = filteredStudents.filter(student => student.diploma === 'Красный');
  } else if (isNotConsideredChecked) {
  }

  if (
    faculties.some(faculty => faculty.directions.some(direction => direction.isChecked))
  ) {
    filteredStudents = students.filter(student =>
      faculties.some(faculty =>
        faculty.directions.some(
          direction => direction.isChecked && direction.name === student.direction
        )
      )
    );
  }
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = event => {
    setSearchTerm(event.target.value);
  };

  const filteredDirections = faculties.reduce((accumulator, faculty) => {
    const filteredFacultyDirections = faculty.directions.filter(direction =>
      direction.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return [...accumulator, ...filteredFacultyDirections];
  }, []);
  console.log(students);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  console.log(selectedStudents);

  const toggleCheckbox = studentId => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      // Если уже выбраны все, снимаем выбор со всех студентов
      setSelectedStudents([]);
    } else {
      // Иначе выбираем всех студентов
      setSelectedStudents(students.map(student => student._id));
    }
    // Инвертируем состояние выбора всех чекбоксов
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://2983365-dv35082.twc1.net/service');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Фильтрация пустых или неполных записей
        const filteredStudents = data.students.filter(student => student.name);
        setStudents(filteredStudents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
      // Cancel the request here if needed
    };
  }, []);
  const [isChecked, setIsChecked] = useState(true);

  console.log(isChecked);

  const [searchValue, setSearchValue] = useState('');
  /*
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  */

  const handleSearchChange = event => {
    setSearchValue(event.target.value);
  };

  const deleteStudents = async () => {
    try {
      const response = await fetch('https://2983365-dv35082.twc1.net/service/only', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedStudents }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete students');
      }
      const data = await response.json();
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const [addModal, setAddModal] = useState(false);

  useEffect(() => {
    // Проверяем значение avatar и устанавливаем соответствующий стиль для body
    if (addModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [addModal]);

  const resetFaculties = () => {
    setFaculties(prevFaculties =>
      prevFaculties.map(faculty => ({
        ...faculty,
        directions: faculty.directions.map(direction => ({
          ...direction,
          isChecked: false,
        })),
      }))
    );
    setSearchTerm('');
  };

  return (
    <>
      <div className="w-[100%] h-[100%] relative">
        {addModal && <AddModal setAddModal={setAddModal} />}

        {filters && (
          <div className="min-w-[100%] min-h-[100%] absolute bg-lightBlack z-[9999999]">
            <div class="w-[100%]  filterMob min-h-[800px] relative  pb-[30px] bg-white flex-col justify-start items-start gap-5 inline-flex">
              <button
                onClick={() => setFilters(false)}
                className="w-[4%] mx-4  items-center flex my-4"
              >
                <img className="min-w-[6px] mx-3" src="/LeftLayer.svg" />
                <div>
                  <span>Назад</span>
                </div>
              </button>
              <div className="flex w-[94%] pl-[4%] pr-[2%] pt-5 justify-between">
                <div>
                  <span className="text-xl font-bold">Фильтры</span>
                </div>
                <button onClick={resetFaculties}>
                  <span className=" text-blue-500">Очистить все</span>
                </button>
              </div>
              <div className="w-[100%]">
                <hr
                  style={{ borderColor: '#6F767E' }}
                  className="w-[94%] flex justify-center h-[0px]"
                />
              </div>
              <div className="w-[100%] pl-[4%] pr-[2%] text-left">
                <span class=" text-gray-900 text-[16px] font-bold font-['Manrope']">
                  Факультет/Направление{' '}
                </span>
              </div>
              <div className="w-[100%] pl-[4%] pr-[2%] flex justify-left ">
                <input
                  placeholder="Найти нужное направление "
                  class="w-[90%] text-[14px] pl-[6%] h-[44px] pl-[15px] pr-[70px] py-[9px] bg-slate-50 rounded-[7px] justify-center items-center gap-2.5 inline-flex"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-col text-left w-[100%] pr-[3%] pl-[0%] ">
                <div className="flex-col items-center mx-5 my-2 ">
                  {!searchTerm
                    ? faculties.map(faculty => (
                        <div className="mb-6" key={faculty.id}>
                          <button
                            className="flex my-2 justify-between w-[100%] text-left"
                            onClick={() => handleFacultyClick(faculty.id)}
                          >
                            <span>{faculty.name}</span>
                            <img className="min-w-[20px]" src="CaretDown.svg" />
                          </button>

                          {openFacultyIds.includes(faculty.id) &&
                            faculty.directions.map(direction => (
                              <CustomCheckbox
                                key={direction.id}
                                label={direction.name}
                                isChecked={direction.isChecked}
                                onChange={() =>
                                  handleCheckboxChange(faculty.id, direction.id)
                                }
                              />
                            ))}
                        </div>
                      ))
                    : filteredDirections.map(direction => (
                        <CustomCheckbox
                          key={direction.id}
                          label={direction.name}
                          isChecked={direction.isChecked}
                          onChange={() => handleDirectionsChange(null, direction.id)}
                        />
                      ))}
                </div>
              </div>
              {!searchTerm && (
                <div className="w-[100%] mx-5 h-[120px] mb-4">
                  <div className="w-[100%] h-[76px] flex-col justify-start items-start gap-2.5 inline-flex">
                    <div className="text-gray-900 text-[15px] font-bold font-['Manrope']">
                      Наличие красного диплома
                    </div>

                    <div className="flex-col w-[100%] items-center text-left ">
                      <CheckboxDiplom
                        label="Учитывать"
                        isChecked={isConsideredChecked} // Предположим, что это ваше состояние для учитывания
                        onChange={handleConsideredChange} // Предположим, что это ваш обработчик изменений
                      />

                      <CheckboxDiplom
                        label="Не учитывать"
                        isChecked={isNotConsideredChecked} // Обратное состояние для не учитывания
                        onChange={handleNotConsideredChange} // Обработчик изменений для не учитывания
                      />
                    </div>
                  </div>
                </div>
              )}
              <div className="w-[100%] mt-5 jusify-center">
                <button
                  onClick={() => setFilters(false)}
                  class="w-[80%] h-10 px-5 py-2.5 bg-blue-500 rounded-[10px] justify-center items-center gap-2.5 inline-flex"
                >
                  <div class="grow shrink basis-0 text-center text-white text-[15px] font-semibold font-['Manrope']">
                    Применить
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
        <Navbar />
        <div className="App w-[100%] ">
          <div className="relative">
            <div className="img-container">
              <img src="Chesu.png" className="w-[1800px] h-[209px]" alt="Chesu" />
            </div>
            <div className="absolute top-0 title-cont left-[5%] w-[52%] h-full flex flex-col justify-center items-left">
              <span className="text-white text-left title text-3xl font-extrabold font-manrope mb-4">
                Портфолио студентов Чеченского государственного университет им. А.А.
                Кадырова
              </span>
              <span className="text-white desc w-[60%] text-left text-[15px]">
                Данный сервис предназначен для работодателей, которые ищут для найма
                студентов-выпускников нашего ВУЗа
              </span>
            </div>
          </div>
          <div className="flex w-[100%]">
            <div class="w-[30%] filters min-h-[800px] relative  pb-[30px] bg-white flex-col justify-start items-start gap-5 inline-flex">
              <div className="flex w-[94%] pl-[4%] pr-[2%] pt-5 justify-between">
                <div>
                  <span className="text-xl font-bold">Фильтры</span>
                </div>
                <button onClick={resetFaculties}>
                  <span className=" text-blue-500">Очистить все</span>
                </button>
              </div>
              <div className="w-[100%]">
                <hr
                  style={{ borderColor: '#6F767E' }}
                  className="w-[94%] flex justify-center h-[0px]"
                />
              </div>
              <div className="w-[100%] pl-[4%] pr-[2%] text-left">
                <span class=" text-gray-900 text-[16px] font-bold font-['Manrope']">
                  Факультет/Направление{' '}
                </span>
              </div>
              <div className="w-[100%] pl-[4%] pr-[2%] flex justify-left ">
                <input
                  placeholder="Найти нужное направление "
                  class="w-[90%] text-[14px] pl-[6%] h-[44px] pl-[15px] pr-[70px] py-[9px] bg-slate-50 rounded-[7px] justify-center items-center gap-2.5 inline-flex"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex-col text-left w-[100%] pr-[3%] pl-[0%] ">
                <div className="flex-col items-center mx-5 my-2 ">
                  {!searchTerm
                    ? faculties.map(faculty => (
                        <div className="mb-6" key={faculty.id}>
                          <button
                            className="flex my-2 justify-between w-[100%] text-left"
                            onClick={() => handleFacultyClick(faculty.id)}
                          >
                            <span>{faculty.name}</span>
                            <img className="min-w-[20px]" src="CaretDown.svg" />
                          </button>

                          {openFacultyIds.includes(faculty.id) &&
                            faculty.directions.map(direction => (
                              <CustomCheckbox
                                key={direction.id}
                                label={direction.name}
                                isChecked={direction.isChecked}
                                onChange={() =>
                                  handleCheckboxChange(faculty.id, direction.id)
                                }
                              />
                            ))}
                        </div>
                      ))
                    : filteredDirections.map(direction => (
                        <CustomCheckbox
                          key={direction.id}
                          label={direction.name}
                          isChecked={direction.isChecked}
                          onChange={() => handleDirectionsChange(null, direction.id)}
                        />
                      ))}
                  {!searchTerm && (
                    <div className="w-[100%] h-[120px] mb-4">
                      <div className="w-[100%] h-[76px] flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="text-gray-900 text-[15px] font-bold font-['Manrope']">
                          Наличие красного диплома
                        </div>

                        <div className="flex-col w-[100%] items-center text-left ">
                          <CheckboxDiplom
                            label="Учитывать"
                            isChecked={isConsideredChecked} // Предположим, что это ваше состояние для учитывания
                            onChange={handleConsideredChange} // Предположим, что это ваш обработчик изменений
                          />

                          <CheckboxDiplom
                            label="Не учитывать"
                            isChecked={isNotConsideredChecked} // Обратное состояние для не учитывания
                            onChange={handleNotConsideredChange} // Обработчик изменений для не учитывания
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-[100%] flex-col">
              <div className="w-[92.8%] items-center flex ml-[3%] my-[2%]">
                <div className="w-[80%] text-left searchStud ">
                  <span class="w-[100%] muchStud text-left text-gray-900 text-[25px] font-extrabold font-['Manrope'] leading-[37.50px]">
                    Найдено {filteredStudents.length} студентов
                  </span>
                </div>
                <div className="w-[80%] filter-mob text-left  ">
                  <button
                    onClick={() => setFilters(true)}
                    class="w-[118px] filterMobCont h-[39px] px-5 py-2 bg-blue-500 rounded-[5px] flex-col justify-center items-start gap-[7px] inline-flex"
                  >
                    <div class="self-stretch justify-center items-center gap-[7px] inline-flex">
                      <div class="w-3 h-3 relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                        >
                          <path
                            d="M2 9H6.05C6.25 9.85 7.05 10.5 8 10.5C8.95 10.5 9.7 9.85 9.95 9H10C10.3 9 10.5 8.8 10.5 8.5C10.5 8.2 10.3 8 10 8H9.95C9.75 7.15 8.95 6.5 8 6.5C7.05 6.5 6.3 7.15 6.05 8H2C1.7 8 1.5 8.2 1.5 8.5C1.5 8.8 1.7 9 2 9ZM8 7.5C8.55 7.5 9 7.95 9 8.5C9 9.05 8.55 9.5 8 9.5C7.45 9.5 7 9.05 7 8.5C7 7.95 7.45 7.5 8 7.5Z"
                            fill="white"
                          />
                          <path
                            d="M2 5H2.05C2.25 5.85 3.05 6.5 4 6.5C4.95 6.5 5.7 5.85 5.95 5H10C10.3 5 10.5 4.8 10.5 4.5C10.5 4.2 10.3 4 10 4H5.95C5.75 3.15 4.95 2.5 4 2.5C3.05 2.5 2.3 3.15 2.05 4H2C1.7 4 1.5 4.2 1.5 4.5C1.5 4.8 1.7 5 2 5ZM4 3.5C4.55 3.5 5 3.95 5 4.5C5 5.05 4.55 5.5 4 5.5C3.45 5.5 3 5.05 3 4.5C3 3.95 3.45 3.5 4 3.5Z"
                            fill="white"
                          />
                        </svg>
                      </div>
                      <div class="grow  shrink basis-0 text-white text-[13px] font-semibold font-['Manrope'] leading-[14.30px]">
                        Фильтры
                      </div>
                    </div>
                  </button>
                </div>
                <div className="flex items-center  ">
                  <button
                    onClick={() => setColumn(true)}
                    className="w-[48px] z-[99999] btn-mob h-[48px] bg-customWhite flex justify-center items-center rounded-[10px] "
                  >
                    {column ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                        class="svg-icon"
                      >
                        <rect width="10.3103" height="10.3103" rx="4" fill="#2A85FF" />
                        <rect
                          y="12.6897"
                          width="10.3103"
                          height="10.3103"
                          rx="4"
                          fill="#2A85FF"
                        />
                        <rect
                          x="12.6895"
                          width="10.3103"
                          height="10.3103"
                          rx="4"
                          fill="#2A85FF"
                        />
                        <rect
                          x="12.6895"
                          y="12.6897"
                          width="10.3103"
                          height="10.3103"
                          rx="4"
                          fill="#2A85FF"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 19 19"
                        fill="none"
                        class="svg-icon"
                      >
                        <rect
                          x="0.791992"
                          y="0.791672"
                          width="7.16236"
                          height="7.16236"
                          rx="2.66667"
                          stroke="#130F26"
                        />
                        <rect
                          x="0.791992"
                          y="10.8376"
                          width="7.16236"
                          height="7.16236"
                          rx="2.66667"
                          stroke="#130F26"
                        />
                        <rect
                          x="10.8379"
                          y="0.791672"
                          width="7.16236"
                          height="7.16236"
                          rx="2.66667"
                          stroke="#130F26"
                        />
                        <rect
                          x="10.8379"
                          y="10.8376"
                          width="7.16236"
                          height="7.16236"
                          rx="2.66667"
                          stroke="#130F26"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => setColumn(false)}
                    className="w-[48px] btn-mob mx-3 h-[48px] bg-customWhite flex justify-center items-center rounded-[10px]"
                  >
                    {column ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="14"
                        viewBox="0 0 21 14"
                        fill="none"
                        class="svg-icon"
                      >
                        <line y1="1" x2="21" y2="1" stroke="#130F26" stroke-width="2" />
                        <line y1="7" x2="17" y2="7" stroke="#130F26" stroke-width="2" />
                        <line y1="13" x2="12" y2="13" stroke="#130F26" stroke-width="2" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="14"
                        viewBox="0 0 21 14"
                        fill="none"
                        class="svg-icon"
                      >
                        <line y1="1" x2="21" y2="1" stroke="#2A85FF" stroke-width="2" />
                        <line y1="7" x2="17" y2="7" stroke="#2A85FF" stroke-width="2" />
                        <line y1="13" x2="12" y2="13" stroke="#2A85FF" stroke-width="2" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="w-[40%]">
                  <div className="relative flex items-center">
                    <select className="absolute inset-0 w-full h-full opacity-0">
                      <option>Сортировка по</option>
                      <option key="1">выбор</option>
                    </select>
                    <div className="w-[100%] select min-w-[180px] h-12 p-3 bg-white rounded-[10px] shadow justify-between items-center inline-flex">
                      <div className="w-[98%] flex">
                        <div className="w-[100%] flex items-center ">
                          <img
                            className="max-w-[24px] sort-first min-w-[24px]"
                            src="sort.svg"
                          />
                          <div className="text-left mr-[3%]  sort-text ml-[8%]">
                            Сортировка
                          </div>
                        </div>
                        <img className="min-w-[16px] sort-second " src="CaretSort.svg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {column && (
                <div className="w-[100%] flex justify-center relative ">
                  <div className="w-[100%]  flex flex-wrap stud-cont justify-start relative ">
                    {filteredStudents?.map(student => (
                      <div className="w-[22%]  left-[2.6%]  student-card relative max-w-[300px] mr-5  max-h-[200px] min-h-[200px] rounded-[10px] my-2 bg-customWhite flex justify-center  ">
                        <div className="flex-col  ">
                          <div className="flex ava-name justify-center my-6">
                            <div className=" w-[60px] avatar h-[60px] flex justify-center items-center rounded-[360px]">
                              {student?.avatar ? (
                                <img
                                  className="w-[60px]  h-[60px] rounded-[360px]"
                                  src={student?.avatar}
                                />
                              ) : (
                                <div className="bg-slate-50 w-[60px] h-[60px] flex justify-center items-center rounded-[360px]">
                                  <img className="w-[30px] h-[30px]" src="Layer_1.svg" />
                                </div>
                              )}
                            </div>
                            <div className="flex-col ml-4  text-left text-mob">
                              <div className="text-gray-900 nameStud text-[15px] font-extrabold font-['Manrope']">
                                {student?.name.split(' ').slice(0, 2).join(' ')}
                              </div>

                              <div class="text-gray-500 directionStud text-[12px]  font-normal font-['Manrope']">
                                {student?.direction}
                              </div>
                              <div
                                class={`w-[100px] h-5 px-[15px] py-[3px] rounded-xl flex-col justify-center items-center gap-2.5 inline-flex ${
                                  student?.searchJob !== 'Ищет работу'
                                    ? 'bg-red-400'
                                    : 'bg-green-400'
                                }`}
                              >
                                <div class="self-stretch text-center text-white text-[8px] font-normal font-['Manrope']">
                                  {student?.searchJob}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex skills justify-center">
                            <div class="justify-start  items-start skills-cont  inline-flex">
                              {JSON.parse(student.skills[0])
                                .slice(0, 3)
                                .map((skills, index) => (
                                  <div
                                    key={index}
                                    className="w-[50px] skill mr-2 h-6 px-2.5 py-[7px] bg-blue-500 bg-opacity-20 rounded-[15px] justify-center items-center gap-2.5 inline-flex"
                                  >
                                    <div className="text-blue-500 text-[7px] font-normal font-['Manrope']">
                                      {skills}
                                    </div>
                                  </div>
                                ))}
                              {JSON.parse(student.skills[0]).length > 3 && (
                                <div class="w-[30px] h-[25px] px-2.5 py-[7px] rounded-[15px] border border-blue-500 justify-center items-center gap-2.5 inline-flex">
                                  <span class="text-blue-500 text-[8px] font-semibold font-['Manrope']">
                                    +{JSON.parse(student.skills[0]).length - 4}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="w-[100%]  my-3">
                            <Link
                              to={`/student/${student._id}`}
                              className="w-[100%] podrob h-[30px] px-[25px] py-2 bg-blue-500 rounded-[5px] justify-center items-center gap-2.5 inline-flex"
                            >
                              <div class="text-center text-white text-[10px] font-normal font-['Manrope']">
                                Подробнее
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!column && (
                <div className="w-[100%] flex-col  relative   ">
                  {filteredStudents?.map(student => (
                    <div className="w-[93%]  h-[100px] rounded-[10px] left-[3%] relative my-6 bg-customWhite flex justify-center">
                      <div className="flex w-[92%] justify-between items-center ">
                        <div className="flex i  my-6">
                          <div className="bg-slate-50 w-[60px] h-[60px] flex justify-center items-center rounded-[360px]">
                            {student?.avatar ? (
                              <img
                                className="min-w-[60px] min-h-[60px] rounded-[360px]"
                                src={student?.avatar}
                              />
                            ) : (
                              <img className="w-[30px] h-[30px]" src="Layer_1.svg" />
                            )}
                          </div>
                          <div className="flex-col  items-left ml-3 text-left">
                            <div class="text-gray-900 text-[15px] font-extrabold font-['Manrope']">
                              {student?.name.split(' ').slice(0, 2).join(' ')}
                            </div>
                            <div class="text-gray-500  text-[12px] font-normal font-['Manrope']">
                              {student?.direction}
                            </div>
                            <div
                              class={`w-[100px] h-5 px-[15px] py-[3px] rounded-xl flex-col justify-center items-center gap-2.5 inline-flex ${
                                student?.searchJob !== 'Ищет работу'
                                  ? 'bg-red-400'
                                  : 'bg-green-400'
                              }`}
                            >
                              <div class="self-stretch text-center text-white text-[8px] font-normal font-['Manrope']">
                                {student?.searchJob}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="min-w-[30%] skills-col flex justify-center">
                          <div className="w-[100%] flex justify-start">
                            {JSON.parse(student.skills[0])
                              .slice(0, 3)
                              .map((skills, index) => (
                                <div
                                  key={index}
                                  className="min-w-[56.67px] mr-2 flex  justify-center max-w-[56.67px] h-[30px] bg-blue-500 bg-opacity-20 rounded-[20px] justify-center items-center"
                                >
                                  <div className="text-blue-500  text-[9px] font-normal font-['Manrope']">
                                    {skills}
                                  </div>
                                </div>
                              ))}
                            {JSON.parse(student.skills[0]).length > 3 && (
                              <div className="min-w-[56.67px] flex justify-center max-w-[56.67px] h-[30px] bg-blue-500 bg-opacity-20 rounded-[20px] justify-center items-center ml-2">
                                <div className="text-blue-500 text-[8px] font-semibold font-['Manrope']">
                                  +{JSON.parse(student.skills[0]).length - 4}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="w-[20%] podrob-col flex my-3">
                          <Link
                            to={`/student/${student._id}`}
                            class="w-[100%] h-[30px] px-[25px] py-2 bg-blue-500 rounded-lg flex-col justify-center items-center gap-2.5 inline-flex"
                          >
                            <div class="text-center text-white text-[10px] font-normal font-['Manrope']">
                              Подробнее
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
